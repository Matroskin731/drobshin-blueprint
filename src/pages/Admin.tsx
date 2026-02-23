import { useState } from "react";
import { useSiteConfig } from "@/contexts/SiteConfigContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Settings, FileText, Package, Eye, Mail, BarChart, Phone, MapPin, Plus, Trash2 } from "lucide-react";
import type { Article, ProductItem } from "@/data/siteConfig";

const Admin = () => {
  const { config, updateConfig, resetConfig } = useSiteConfig();
  const { toast } = useToast();

  const save = (msg: string = "Сохранено") => {
    toast({ title: msg });
  };

  return (
    <div>
      <section className="hero-gradient py-12">
        <div className="section-container">
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Settings className="h-7 w-7" />
            Админ-панель
          </h1>
          <p className="opacity-70 mt-2">Управление контентом сайта «ДробШин»</p>
        </div>
      </section>

      <section className="section-padding">
        <div className="section-container max-w-4xl">
          <Tabs defaultValue="contacts">
            <TabsList className="grid grid-cols-3 lg:grid-cols-6 w-full mb-6">
              <TabsTrigger value="contacts">Контакты</TabsTrigger>
              <TabsTrigger value="navigation">Меню</TabsTrigger>
              <TabsTrigger value="blocks">Блоки</TabsTrigger>
              <TabsTrigger value="products">Продукция</TabsTrigger>
              <TabsTrigger value="articles">Статьи</TabsTrigger>
              <TabsTrigger value="settings">Настройки</TabsTrigger>
            </TabsList>

            {/* Contacts */}
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

                  <Button onClick={() => save("Контакты обновлены")}>Сохранить</Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Navigation */}
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

            {/* Blocks */}
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

            {/* Products */}
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
                        <div key={item.id} className="flex items-center gap-2 p-2 rounded border">
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
                <Button onClick={() => save("Продукция обновлена")}>Сохранить всё</Button>
              </div>
            </TabsContent>

            {/* Articles */}
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
                  <Button onClick={() => save("Статьи обновлены")}>Сохранить</Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Settings */}
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
                          // Also update navigation
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
          </Tabs>
        </div>
      </section>
    </div>
  );
};

export default Admin;
