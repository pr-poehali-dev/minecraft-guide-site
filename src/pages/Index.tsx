import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface Item {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: string;
  rarity?: string;
}

const minecraftData: Item[] = [
  { id: 'b1', name: 'Камень', description: 'Основной строительный блок, добывается киркой', category: 'blocks', icon: '🪨', rarity: 'common' },
  { id: 'b2', name: 'Дерево', description: 'Используется для крафта и строительства', category: 'blocks', icon: '🪵', rarity: 'common' },
  { id: 'b3', name: 'Алмазный блок', description: 'Редкий декоративный блок из 9 алмазов', category: 'blocks', icon: '💎', rarity: 'legendary' },
  { id: 'b4', name: 'Стекло', description: 'Прозрачный блок для окон и декора', category: 'blocks', icon: '🔲', rarity: 'common' },
  { id: 'b5', name: 'Земля', description: 'Блок для садоводства и ландшафта', category: 'blocks', icon: '🟫', rarity: 'common' },
  { id: 'b6', name: 'Обсидиан', description: 'Прочный блок для портала в Ад', category: 'blocks', icon: '⬛', rarity: 'rare' },
  
  { id: 'i1', name: 'Алмазный меч', description: 'Мощное оружие ближнего боя', category: 'items', icon: '⚔️', rarity: 'epic' },
  { id: 'i2', name: 'Кирка', description: 'Инструмент для добычи камня и руды', category: 'items', icon: '⛏️', rarity: 'common' },
  { id: 'i3', name: 'Хлеб', description: 'Восстанавливает 5 единиц голода', category: 'items', icon: '🍞', rarity: 'common' },
  { id: 'i4', name: 'Зелье лечения', description: 'Мгновенно восстанавливает здоровье', category: 'items', icon: '🧪', rarity: 'rare' },
  { id: 'i5', name: 'Удочка', description: 'Используется для ловли рыбы', category: 'items', icon: '🎣', rarity: 'common' },
  { id: 'i6', name: 'Энергетический кристалл', description: 'Редкий ресурс для крафта', category: 'items', icon: '🔮', rarity: 'legendary' },
  
  { id: 'm1', name: 'Крипер', description: 'Взрывается при приближении к игроку', category: 'mobs', icon: '💥', rarity: 'common' },
  { id: 'm2', name: 'Зомби', description: 'Враждебный моб, атакует ночью', category: 'mobs', icon: '🧟', rarity: 'common' },
  { id: 'm3', name: 'Эндермен', description: 'Телепортируется и атакует при взгляде', category: 'mobs', icon: '👾', rarity: 'epic' },
  { id: 'm4', name: 'Корова', description: 'Дружелюбный моб, дает молоко и кожу', category: 'mobs', icon: '🐄', rarity: 'common' },
  { id: 'm5', name: 'Дракон Края', description: 'Финальный босс игры', category: 'mobs', icon: '🐉', rarity: 'legendary' },
  { id: 'm6', name: 'Скелет', description: 'Стреляет из лука на расстоянии', category: 'mobs', icon: '💀', rarity: 'common' },
  
  { id: 'r1', name: 'Верстак', description: 'Крафт: 4 доски дерева', category: 'recipes', icon: '🔨', rarity: 'common' },
  { id: 'r2', name: 'Меч', description: 'Крафт: 2 доски + 1 палка', category: 'recipes', icon: '⚔️', rarity: 'common' },
  { id: 'r3', name: 'Факел', description: 'Крафт: 1 уголь + 1 палка', category: 'recipes', icon: '🔥', rarity: 'common' },
  { id: 'r4', name: 'Печь', description: 'Крафт: 8 булыжника', category: 'recipes', icon: '🏭', rarity: 'common' },
  { id: 'r5', name: 'Кровать', description: 'Крафт: 3 доски + 3 шерсти', category: 'recipes', icon: '🛏️', rarity: 'common' },
  { id: 'r6', name: 'Книжная полка', description: 'Крафт: 6 досок + 3 книги', category: 'recipes', icon: '📚', rarity: 'rare' },
  
  { id: 'bio1', name: 'Равнины', description: 'Плоский биом с травой и деревьями', category: 'biomes', icon: '🌾', rarity: 'common' },
  { id: 'bio2', name: 'Пустыня', description: 'Песчаный биом с кактусами', category: 'biomes', icon: '🏜️', rarity: 'common' },
  { id: 'bio3', name: 'Джунгли', description: 'Густой лес с высокими деревьями', category: 'biomes', icon: '🌴', rarity: 'rare' },
  { id: 'bio4', name: 'Тайга', description: 'Холодный биом с елями', category: 'biomes', icon: '🌲', rarity: 'common' },
  { id: 'bio5', name: 'Грибной остров', description: 'Редкий биом с гигантскими грибами', category: 'biomes', icon: '🍄', rarity: 'legendary' },
  { id: 'bio6', name: 'Ледяные шипы', description: 'Замерзший биом с ледяными пиками', category: 'biomes', icon: '❄️', rarity: 'epic' },
];

const categoryNames = {
  blocks: 'Блоки',
  items: 'Предметы',
  mobs: 'Мобы',
  recipes: 'Рецепты',
  biomes: 'Биомы',
};

const rarityColors = {
  common: 'bg-secondary text-secondary-foreground',
  rare: 'bg-blue-100 text-blue-700',
  epic: 'bg-purple-100 text-purple-700',
  legendary: 'bg-amber-100 text-amber-700',
};

const rarityNames = {
  common: 'Обычный',
  rare: 'Редкий',
  epic: 'Эпический',
  legendary: 'Легендарный',
};

function Index() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');

  const filteredData = minecraftData.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeTab === 'all' || item.category === activeTab;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card sticky top-0 z-10 backdrop-blur-sm bg-card/80">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="text-4xl">⛏️</div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Minecraft Wiki</h1>
              <p className="text-sm text-muted-foreground">Полный справочник по игре</p>
            </div>
          </div>
          
          <div className="relative">
            <Icon name="Search" className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
            <Input
              type="text"
              placeholder="Поиск блоков, предметов, мобов..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12 text-base"
            />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-6 mb-8 h-auto">
            <TabsTrigger value="all" className="flex flex-col gap-1 py-3">
              <Icon name="Grid3x3" size={20} />
              <span className="text-xs">Всё</span>
            </TabsTrigger>
            <TabsTrigger value="blocks" className="flex flex-col gap-1 py-3">
              <Icon name="Box" size={20} />
              <span className="text-xs">Блоки</span>
            </TabsTrigger>
            <TabsTrigger value="items" className="flex flex-col gap-1 py-3">
              <Icon name="Package" size={20} />
              <span className="text-xs">Предметы</span>
            </TabsTrigger>
            <TabsTrigger value="mobs" className="flex flex-col gap-1 py-3">
              <Icon name="Bug" size={20} />
              <span className="text-xs">Мобы</span>
            </TabsTrigger>
            <TabsTrigger value="recipes" className="flex flex-col gap-1 py-3">
              <Icon name="Hammer" size={20} />
              <span className="text-xs">Рецепты</span>
            </TabsTrigger>
            <TabsTrigger value="biomes" className="flex flex-col gap-1 py-3">
              <Icon name="Mountain" size={20} />
              <span className="text-xs">Биомы</span>
            </TabsTrigger>
          </TabsList>

          <div className="mb-4 flex items-center gap-2 text-sm text-muted-foreground">
            <Icon name="Database" size={16} />
            <span>Найдено: {filteredData.length} {filteredData.length === 1 ? 'элемент' : 'элементов'}</span>
          </div>

          <TabsContent value={activeTab} className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredData.map((item) => (
                <Card key={item.id} className="hover:shadow-lg transition-all duration-200 hover:-translate-y-1 cursor-pointer">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="text-5xl">{item.icon}</div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <h3 className="font-semibold text-lg text-foreground">{item.name}</h3>
                          {item.rarity && (
                            <Badge className={rarityColors[item.rarity]} variant="secondary">
                              {rarityNames[item.rarity]}
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">{item.description}</p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Icon name="Tag" size={14} />
                          <span>{categoryNames[item.category as keyof typeof categoryNames]}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredData.length === 0 && (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold mb-2">Ничего не найдено</h3>
                <p className="text-muted-foreground">Попробуйте изменить поисковый запрос</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>

      <footer className="border-t mt-16 py-8 bg-card">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>Minecraft Wiki © 2024 • Неофициальный справочник по игре</p>
        </div>
      </footer>
    </div>
  );
}

export default Index;
