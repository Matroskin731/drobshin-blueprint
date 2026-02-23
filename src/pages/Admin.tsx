import { useState, useEffect } from "react";
import { useSiteConfig } from "@/contexts/SiteConfigContext";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Settings, FileText, Package, Eye, Mail, BarChart, Phone, Plus, Trash2, ImageIcon, Users, LogOut } from "lucide-react";
import type { Article, ProductItem } from "@/data/siteConfig";
import { supabase } from "@/integrations/supabase/client";

type AppRole = "admin" | "manager" | "editor";

interface UserWithRole {
  user_id: string;
  email: string;
  role: AppRole;
  created_at: string;
}

const Admin = () => {
  const { config, updateConfig, resetConfig, refetchFromDB } = useSiteConfig();
  const { user, role, signOut } = useAuth();
  const { toast } = useToast();
  const [saving, setSaving] = useState(false);
  const [users, setUsers] = useState<UserWithRole[]>([]);
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newRole, setNewRole] = useState<AppRole>("editor");
  const [loadingUsers, setLoadingUsers] = useState(false);

  const isAdmin = role === "admin";
  const isManager = role === "manager";
  const isEditor = role === "editor";

  // Fetch users with roles (admin only)
  const fetchUsers = async () => {
    if (!isAdmin) return;
    setLoadingUsers(true);
    const { data } = await supabase.from("user_roles").select("*");
    if (data) {
      // We can't query auth.users from client, so we'll show user_id
      // For a better UX, we'd use an edge function, but user_id is sufficient
      setUsers(data.map(r => ({
        user_id: r.user_id,
        email: r.user_id, // placeholder — will be replaced if we add edge function
        role: r.role as AppRole,
        created_at: r.created_at,
      })));
    }
    setLoadingUsers(false);
  };

  useEffect(() => {
    if (isAdmin) fetchUsers();
  }, [isAdmin]);

  const save = (msg: string = "Сохранено") => {
    toast({ title: msg });
  };

  const saveProducts = async () => {
    setSaving(true);
    try {
      for (const cat of config.products) {
        const { error: catErr } = await supabase
          .from("product_categories")
          .upsert({
            id: cat.id,
            name: cat.name,
            description: cat.description,
            visible: cat.visible,
          });
        if (catErr) throw catErr;

        for (const item of cat.items) {
          const { error: itemErr } = await supabase
            .from("product_items")
            .upsert({
              id: item.id,
              category_id: cat.id,
              name: item.name,
              description: item.description,
              image: item.image || null,
              price: item.price || null,
              show_price: item.showPrice ?? false,
              visible: item.visible,
            });
          if (itemErr) throw itemErr;
        }
      }
      await refetchFromDB();
      toast({ title: "Продукция сохранена в базу данных" });
    } catch (e: any) {
      console.error("saveProducts error:", e);
      const msg = e?.message?.includes("row-level security")
        ? "Нет прав. Проверьте свою роль."
        : `Ошибка: ${e?.message || "неизвестная"}`;
      toast({ title: msg, variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  const saveContacts = async () => {
    setSaving(true);
    try {
      const { data: existing } = await supabase.from("site_contacts").select("id").limit(1);
      if (existing && existing.length > 0) {
        const { error } = await supabase.from("site_contacts").update({
          address: config.contacts.address,
          phones: config.contacts.phones as any,
          emails: config.contacts.emails,
          schedule: config.contacts.schedule,
          form_email: config.formEmail,
        }).eq("id", existing[0].id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("site_contacts").insert({
          address: config.contacts.address,
          phones: config.contacts.phones as any,
          emails: config.contacts.emails,
          schedule: config.contacts.schedule,
          form_email: config.formEmail,
        });
        if (error) throw error;
      }
      await refetchFromDB();
      toast({ title: "Контакты сохранены в базу данных" });
    } catch (e: any) {
      console.error(e);
      const msg = e?.message?.includes("row-level security")
        ? "Нет прав. Только администратор может изменять контакты."
        : `Ошибка: ${e?.message || "неизвестная"}`;
      toast({ title: msg, variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  const saveArticles = async () => {
    setSaving(true);
    try {
      const { data: existingArticles } = await supabase.from("articles").select("id");
      const existingIds = new Set((existingArticles || []).map(a => a.id));
      const currentIds = new Set(config.articles.map(a => a.id));

      for (const id of existingIds) {
        if (!currentIds.has(id)) {
          const { error } = await supabase.from("articles").delete().eq("id", id);
          if (error) throw error;
        }
      }

      for (const article of config.articles) {
        const { error } = await supabase.from("articles").upsert({
          id: article.id,
          title: article.title,
          excerpt: article.excerpt,
          content: article.content,
          date: article.date,
          visible: article.visible,
        });
        if (error) throw error;
      }
      await refetchFromDB();
      toast({ title: "Статьи сохранены в базу данных" });
    } catch (e: any) {
      console.error(e);
      const msg = e?.message?.includes("row-level security")
        ? "Нет прав. Проверьте свою роль."
        : `Ошибка: ${e?.message || "неизвестная"}`;
      toast({ title: msg, variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  const changeUserRole = async (userId: string, newRole: AppRole) => {
    const { error } = await supabase
      .from("user_roles")
      .update({ role: newRole })
      .eq("user_id", userId);
    if (error) {
      toast({ title: "Ошибка смены роли", variant: "destructive" });
    } else {
      toast({ title: "Роль обновлена" });
      fetchUsers();
    }
  };

  const deleteUserRole = async (userId: string) => {
    const { error } = await supabase
      .from("user_roles")
      .delete()
      .eq("user_id", userId);
    if (error) {
      toast({ title: "Ошибка удаления", variant: "destructive" });
    } else {
      toast({ title: "Пользователь удалён из системы ролей" });
      fetchUsers();
    }
  };

  const addUser = async () => {
    if (!newEmail || !newPassword) {
      toast({ title: "Заполните email и пароль", variant: "destructive" });
      return;
    }
    setSaving(true);
    try {
      // Create user via edge function would be ideal, but for now we sign up
      // and assign role. The admin will need to use an edge function for production.
      // For this implementation, we insert the role for existing users by email lookup.
      // Since we can't create users from client SDK as admin, we'll insert role by user_id.
      toast({ 
        title: "Для добавления пользователя: зарегистрируйте его через /login, затем назначьте роль по ID.", 
        description: "User ID можно найти в базе данных после регистрации." 
      });
    } finally {
      setSaving(false);
    }
  };

  // Determine which tabs to show based on role
  const availableTabs: { value: string; label: string }[] = [];
  if (isAdmin) {
    availableTabs.push(
      { value: "contacts", label: "Контакты" },
      { value: "navigation", label: "Меню" },
      { value: "blocks", label: "Блоки" },
      { value: "products", label: "Продукция" },
      { value: "articles", label: "Статьи" },
      { value: "settings", label: "Настройки" },
      { value: "users", label: "Пользователи" },
    );
  } else if (isManager) {
    availableTabs.push(
      { value: "products", label: "Продукция" },
    );
  } else if (isEditor) {
    availableTabs.push(
      { value: "articles", label: "Статьи" },
    );
  }

  const defaultTab = availableTabs[0]?.value || "contacts";

  const roleLabel = (r: AppRole) => {
    if (r === "admin") return "Администратор";
    if (r === "manager") return "Менеджер";
    if (r === "editor") return "Редактор";
    return "—";
  };

  return (
    <div>
      <section className="hero-gradient py-12">
        <div className="section-container">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold flex items-center gap-3">
                <Settings className="h-7 w-7" />
                Админ-панель
              </h1>
              <p className="opacity-70 mt-2">
                {user?.email} — {roleLabel(role as AppRole)}
              </p>
            </div>
            <Button
              size="sm"
              onClick={signOut}
              className="bg-[hsl(25,95%,53%)] text-white hover:bg-[hsl(25,95%,40%)] hover:text-white"
            >
              <LogOut className="h-4 w-4 mr-1" /> Выйти
            </Button>
          </div>
        </div>
      </section>

      {!role ? (
        <section className="section-padding">
          <div className="section-container max-w-4xl text-center">
            <p className="text-muted-foreground">У вас нет назначенной роли. Обратитесь к администратору.</p>
          </div>
        </section>
      ) : (
        <section className="section-padding">
          <div className="section-container max-w-4xl">
            <Tabs defaultValue={defaultTab}>
              <TabsList className={`grid w-full mb-6`} style={{ gridTemplateColumns: `repeat(${availableTabs.length}, 1fr)` }}>
                {availableTabs.map(tab => (
                  <TabsTrigger key={tab.value} value={tab.value}>{tab.label}</TabsTrigger>
                ))}
              </TabsList>

              {/* Contacts - admin only */}
              <TabsContent value="contacts">
                <Card>
                  <CardHeader><CardTitle className="flex items-center gap-2"><Phone className="h-5 w-5" />Контактная информация</CardTitle></CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label>Адрес</Label>
                      <Input
                        value={config.contacts.address}
                        onChange={(e) => updateConfig({ contacts: { ...config.contacts, address: e.target.value } })}
                      />
                    </div>

                    <div className="space-y-3">
                      <Label>Телефоны</Label>
                      {config.contacts.phones.map((phone, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <div className="flex-1 grid grid-cols-3 gap-2">
                            <Input placeholder="Имя" value={phone.name}
                              onChange={(e) => {
                                const phones = [...config.contacts.phones];
                                phones[i] = { ...phones[i], name: e.target.value };
                                updateConfig({ contacts: { ...config.contacts, phones } });
                              }} />
                            <Input placeholder="Должность" value={phone.role}
                              onChange={(e) => {
                                const phones = [...config.contacts.phones];
                                phones[i] = { ...phones[i], role: e.target.value };
                                updateConfig({ contacts: { ...config.contacts, phones } });
                              }} />
                            <Input placeholder="Телефон" value={phone.number}
                              onChange={(e) => {
                                const phones = [...config.contacts.phones];
                                phones[i] = { ...phones[i], number: e.target.value };
                                updateConfig({ contacts: { ...config.contacts, phones } });
                              }} />
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="shrink-0 mt-0.5"
                            onClick={() => {
                              const phones = config.contacts.phones.filter((_, idx) => idx !== i);
                              updateConfig({ contacts: { ...config.contacts, phones } });
                            }}
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      ))}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          const phones = [...config.contacts.phones, { name: "", role: "", number: "" }];
                          updateConfig({ contacts: { ...config.contacts, phones } });
                        }}
                      >
                        <Plus className="h-4 w-4 mr-1" /> Добавить контакт
                      </Button>
                    </div>

                    <div className="space-y-2">
                      <Label>Email адреса (по одному на строку)</Label>
                      <Textarea
                        value={config.contacts.emails.join("\n")}
                        onChange={(e) => updateConfig({ contacts: { ...config.contacts, emails: e.target.value.split("\n").filter(Boolean) } })}
                        rows={3}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>График работы (по одному на строку)</Label>
                      <Textarea
                        value={config.contacts.schedule.join("\n")}
                        onChange={(e) => updateConfig({ contacts: { ...config.contacts, schedule: e.target.value.split("\n").filter(Boolean) } })}
                        rows={3}
                      />
                    </div>

                    <Button onClick={saveContacts} disabled={saving}>{saving ? "Сохранение..." : "Сохранить"}</Button>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Navigation - admin only */}
              <TabsContent value="navigation">
                <Card>
                  <CardHeader><CardTitle className="flex items-center gap-2"><Eye className="h-5 w-5" />Управление меню</CardTitle></CardHeader>
                  <CardContent className="space-y-3">
                    {config.navigation.map((item) => (
                      <div key={item.id} className="flex items-center justify-between p-3 rounded-lg border">
                        <div>
                          <p className="font-medium">{item.title}</p>
                          <p className="text-xs text-muted-foreground">{item.path}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-muted-foreground">{item.visible ? "Видимый" : "Скрытый"}</span>
                          <Switch
                            checked={item.visible}
                            onCheckedChange={(checked) => {
                              const nav = config.navigation.map((n) => n.id === item.id ? { ...n, visible: checked } : n);
                              updateConfig({ navigation: nav });
                            }}
                          />
                        </div>
                      </div>
                    ))}
                    <Button onClick={() => save("Меню обновлено")}>Сохранить</Button>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Blocks - admin only */}
              <TabsContent value="blocks">
                <Card>
                  <CardHeader><CardTitle className="flex items-center gap-2"><Eye className="h-5 w-5" />Блоки главной страницы</CardTitle></CardHeader>
                  <CardContent className="space-y-3">
                    {config.homeBlocks.map((block) => (
                      <div key={block.id} className="flex items-center justify-between p-3 rounded-lg border">
                        <p className="font-medium">{block.title}</p>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-muted-foreground">{block.visible ? "Вкл" : "Выкл"}</span>
                          <Switch
                            checked={block.visible}
                            onCheckedChange={(checked) => {
                              const blocks = config.homeBlocks.map((b) => b.id === block.id ? { ...b, visible: checked } : b);
                              updateConfig({ homeBlocks: blocks });
                            }}
                          />
                        </div>
                      </div>
                    ))}
                    <Button onClick={() => save("Блоки обновлены")}>Сохранить</Button>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Products - admin + manager */}
              <TabsContent value="products">
                <div className="space-y-6">
                  {config.products.map((category, ci) => (
                    <Card key={category.id}>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle className="flex items-center gap-2">
                            <Package className="h-5 w-5" />
                            {category.name}
                          </CardTitle>
                          <Switch
                            checked={category.visible}
                            onCheckedChange={(checked) => {
                              const products = [...config.products];
                              products[ci] = { ...products[ci], visible: checked };
                              updateConfig({ products });
                            }}
                          />
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="space-y-2">
                          <Label>Описание категории</Label>
                          <Input
                            value={category.description}
                            onChange={(e) => {
                              const products = [...config.products];
                              products[ci] = { ...products[ci], description: e.target.value };
                              updateConfig({ products });
                            }}
                          />
                        </div>
                        {category.items.map((item, ii) => (
                          <div key={item.id} className="p-3 rounded border space-y-2">
                            <div className="flex items-center gap-2">
                              <div className="flex-1 grid grid-cols-2 gap-2">
                                <Input
                                  value={item.name}
                                  onChange={(e) => {
                                    const products = [...config.products];
                                    const items = [...products[ci].items];
                                    items[ii] = { ...items[ii], name: e.target.value };
                                    products[ci] = { ...products[ci], items };
                                    updateConfig({ products });
                                  }}
                                />
                                <Input
                                  value={item.description}
                                  onChange={(e) => {
                                    const products = [...config.products];
                                    const items = [...products[ci].items];
                                    items[ii] = { ...items[ii], description: e.target.value };
                                    products[ci] = { ...products[ci], items };
                                    updateConfig({ products });
                                  }}
                                />
                              </div>
                              <Switch
                                checked={item.visible}
                                onCheckedChange={(checked) => {
                                  const products = [...config.products];
                                  const items = [...products[ci].items];
                                  items[ii] = { ...items[ii], visible: checked };
                                  products[ci] = { ...products[ci], items };
                                  updateConfig({ products });
                                }}
                              />
                            </div>
                            <div className="flex items-center gap-2">
                              {item.image ? (
                                <img src={item.image} alt={item.name} className="h-10 w-10 rounded object-cover" />
                              ) : (
                                <div className="h-10 w-10 rounded bg-muted flex items-center justify-center">
                                  <ImageIcon className="h-5 w-5 text-muted-foreground" />
                                </div>
                              )}
                              <label className="cursor-pointer text-xs text-primary hover:underline">
                                {item.image ? "Заменить" : "Загрузить"}
                                <input
                                  type="file"
                                  accept="image/*"
                                  className="hidden"
                                  onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (!file) return;
                                    const reader = new FileReader();
                                    reader.onload = (ev) => {
                                      const products = [...config.products];
                                      const items = [...products[ci].items];
                                      items[ii] = { ...items[ii], image: ev.target?.result as string };
                                      products[ci] = { ...products[ci], items };
                                      updateConfig({ products });
                                    };
                                    reader.readAsDataURL(file);
                                  }}
                                />
                              </label>
                              {item.image && (
                                <button
                                  className="text-xs text-destructive hover:underline"
                                  onClick={() => {
                                    const products = [...config.products];
                                    const items = [...products[ci].items];
                                    items[ii] = { ...items[ii], image: undefined };
                                    products[ci] = { ...products[ci], items };
                                    updateConfig({ products });
                                  }}
                                >
                                  Удалить
                                </button>
                              )}
                            </div>
                            <div className="flex items-center gap-2">
                              <Input
                                placeholder="Цена (напр. 1 500 ₽/м²)"
                                value={item.price || ""}
                                className="max-w-[200px]"
                                onChange={(e) => {
                                  const products = [...config.products];
                                  const items = [...products[ci].items];
                                  items[ii] = { ...items[ii], price: e.target.value };
                                  products[ci] = { ...products[ci], items };
                                  updateConfig({ products });
                                }}
                              />
                              <div className="flex items-center gap-1.5">
                                <span className="text-xs text-muted-foreground whitespace-nowrap">Показать цену</span>
                                <Switch
                                  checked={item.showPrice ?? false}
                                  onCheckedChange={(checked) => {
                                    const products = [...config.products];
                                    const items = [...products[ci].items];
                                    items[ii] = { ...items[ii], showPrice: checked };
                                    products[ci] = { ...products[ci], items };
                                    updateConfig({ products });
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            const products = [...config.products];
                            const newItem: ProductItem = {
                              id: `item-${Date.now()}`,
                              name: "Новая позиция",
                              description: "Описание",
                              visible: true,
                            };
                            products[ci] = { ...products[ci], items: [...products[ci].items, newItem] };
                            updateConfig({ products });
                          }}
                        >
                          <Plus className="h-4 w-4 mr-1" /> Добавить позицию
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                  <Button onClick={saveProducts} disabled={saving}>{saving ? "Сохранение..." : "Сохранить всё"}</Button>
                </div>
              </TabsContent>

              {/* Articles - admin + editor */}
              <TabsContent value="articles">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2"><FileText className="h-5 w-5" />Статьи</CardTitle>
                      <Button
                        size="sm"
                        onClick={() => {
                          const newArticle: Article = {
                            id: `article-${Date.now()}`,
                            title: "Новая статья",
                            excerpt: "Краткое описание",
                            content: "Содержание статьи...",
                            date: new Date().toISOString().split("T")[0],
                            visible: true,
                          };
                          updateConfig({ articles: [...config.articles, newArticle] });
                        }}
                      >
                        <Plus className="h-4 w-4 mr-1" /> Добавить
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {config.articles.map((article, i) => (
                      <div key={article.id} className="p-4 rounded-lg border space-y-2">
                        <div className="flex items-center justify-between">
                          <Input
                            className="font-semibold"
                            value={article.title}
                            onChange={(e) => {
                              const articles = [...config.articles];
                              articles[i] = { ...articles[i], title: e.target.value };
                              updateConfig({ articles });
                            }}
                          />
                          <div className="flex items-center gap-2 ml-2">
                            <Switch
                              checked={article.visible}
                              onCheckedChange={(checked) => {
                                const articles = [...config.articles];
                                articles[i] = { ...articles[i], visible: checked };
                                updateConfig({ articles });
                              }}
                            />
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                updateConfig({ articles: config.articles.filter((a) => a.id !== article.id) });
                              }}
                            >
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          </div>
                        </div>
                        <Input
                          placeholder="Краткое описание"
                          value={article.excerpt}
                          onChange={(e) => {
                            const articles = [...config.articles];
                            articles[i] = { ...articles[i], excerpt: e.target.value };
                            updateConfig({ articles });
                          }}
                        />
                        <Textarea
                          placeholder="Содержание"
                          value={article.content}
                          onChange={(e) => {
                            const articles = [...config.articles];
                            articles[i] = { ...articles[i], content: e.target.value };
                            updateConfig({ articles });
                          }}
                          rows={3}
                        />
                      </div>
                    ))}
                    <Button onClick={saveArticles} disabled={saving}>{saving ? "Сохранение..." : "Сохранить"}</Button>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Settings - admin only */}
              <TabsContent value="settings">
                <div className="space-y-6">
                  <Card>
                    <CardHeader><CardTitle className="flex items-center gap-2"><Mail className="h-5 w-5" />Email для заявок</CardTitle></CardHeader>
                    <CardContent className="space-y-4">
                      <Input
                        value={config.formEmail}
                        onChange={(e) => updateConfig({ formEmail: e.target.value })}
                        placeholder="email@example.com"
                      />
                      <Button onClick={() => save("Email обновлён")}>Сохранить</Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader><CardTitle className="flex items-center gap-2"><BarChart className="h-5 w-5" />Код аналитики</CardTitle></CardHeader>
                    <CardContent className="space-y-4">
                      <Label>Яндекс.Метрика или другой код</Label>
                      <Textarea
                        value={config.analyticsCode}
                        onChange={(e) => updateConfig({ analyticsCode: e.target.value })}
                        placeholder="<!-- Вставьте код счётчика -->"
                        rows={5}
                      />
                      <Button onClick={() => save("Код аналитики сохранён")}>Сохранить</Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader><CardTitle className="flex items-center gap-2"><Eye className="h-5 w-5" />Розница</CardTitle></CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Label>Показывать раздел «Розница»</Label>
                        <Switch
                          checked={config.retailVisible}
                          onCheckedChange={(checked) => {
                            updateConfig({ retailVisible: checked });
                            const nav = config.navigation.map((n) => n.id === "retail" ? { ...n, visible: checked } : n);
                            updateConfig({ navigation: nav });
                          }}
                        />
                      </div>
                      <Button onClick={() => save("Настройки обновлены")}>Сохранить</Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader><CardTitle>Сброс настроек</CardTitle></CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-3">Вернуть все настройки к значениям по умолчанию</p>
                      <Button variant="destructive" onClick={() => { resetConfig(); save("Настройки сброшены"); }}>
                        Сбросить всё
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Users - admin only */}
              <TabsContent value="users">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Users className="h-5 w-5" />Управление пользователями</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Add role to user */}
                    <div className="p-4 rounded-lg border space-y-3">
                      <h3 className="font-medium">Назначить роль пользователю</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                        <Input
                          placeholder="User ID (UUID)"
                          value={newEmail}
                          onChange={(e) => setNewEmail(e.target.value)}
                        />
                        <Select value={newRole} onValueChange={(v) => setNewRole(v as AppRole)}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="admin">Администратор</SelectItem>
                            <SelectItem value="manager">Менеджер</SelectItem>
                            <SelectItem value="editor">Редактор</SelectItem>
                          </SelectContent>
                        </Select>
                        <Button
                          onClick={async () => {
                            if (!newEmail) return;
                            const { error } = await supabase.from("user_roles").insert({
                              user_id: newEmail,
                              role: newRole,
                            });
                            if (error) {
                              toast({ title: `Ошибка: ${error.message}`, variant: "destructive" });
                            } else {
                              toast({ title: "Роль назначена" });
                              setNewEmail("");
                              fetchUsers();
                            }
                          }}
                        >
                          Назначить
                        </Button>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Пользователь должен сначала зарегистрироваться. User ID можно найти в базе данных.
                      </p>
                    </div>

                    {/* User list */}
                    <div className="space-y-3">
                      <h3 className="font-medium">Текущие пользователи</h3>
                      {loadingUsers ? (
                        <p className="text-muted-foreground text-sm">Загрузка...</p>
                      ) : users.length === 0 ? (
                        <p className="text-muted-foreground text-sm">Нет пользователей с назначенными ролями</p>
                      ) : (
                        users.map((u) => (
                          <div key={u.user_id} className="flex items-center justify-between p-3 rounded-lg border">
                            <div>
                              <p className="text-sm font-mono">{u.user_id}</p>
                              <p className="text-xs text-muted-foreground">{roleLabel(u.role)}</p>
                            </div>
                            <div className="flex items-center gap-2">
                              <Select
                                value={u.role}
                                onValueChange={(v) => changeUserRole(u.user_id, v as AppRole)}
                              >
                                <SelectTrigger className="w-[140px]">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="admin">Администратор</SelectItem>
                                  <SelectItem value="manager">Менеджер</SelectItem>
                                  <SelectItem value="editor">Редактор</SelectItem>
                                </SelectContent>
                              </Select>
                              {u.user_id !== user?.id && (
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => deleteUserRole(u.user_id)}
                                >
                                  <Trash2 className="h-4 w-4 text-destructive" />
                                </Button>
                              )}
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      )}
    </div>
  );
};

export default Admin;
