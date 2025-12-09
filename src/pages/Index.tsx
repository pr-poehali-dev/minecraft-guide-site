import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';

interface Item {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: string;
  rarity?: string;
  details?: {
    type?: string;
    health?: number;
    damage?: number;
    durability?: number;
    stackable?: number;
    craftingTime?: string;
    ingredients?: string[];
    temperature?: string;
    structures?: string[];
    drops?: string[];
  };
}

const minecraftData: Item[] = [
  { id: 'b1', name: 'Камень', description: 'Основной строительный блок в Minecraft. Добывается киркой любого уровня. Идеально подходит для строительства прочных зданий и крепостей. Часто встречается в пещерах и под землей. Можно переплавить в печи для получения гладкого камня.', category: 'blocks', icon: '🪨', rarity: 'common', details: { type: 'Твёрдый блок', durability: 30, stackable: 64 } },
  { id: 'b2', name: 'Дерево', description: 'Универсальный природный ресурс, основа для крафта. Существует 6 видов дерева: дуб, берёза, ель, джунгли, акация и тёмный дуб. Из брёвен можно создать доски - базовый строительный материал. Первый блок, который добывает каждый игрок.', category: 'blocks', icon: '🪵', rarity: 'common', details: { type: 'Природный блок', durability: 10, stackable: 64 } },
  { id: 'b3', name: 'Алмазный блок', description: 'Роскошный декоративный блок, созданный из 9 алмазов. Символ богатства и достижений в мире Minecraft. Можно разбить обратно на алмазы для хранения ресурсов. Часто используется для украшения тронных залов и сокровищниц.', category: 'blocks', icon: '💎', rarity: 'legendary', details: { type: 'Декоративный блок', durability: 30, stackable: 64 } },
  { id: 'b4', name: 'Стекло', description: 'Прозрачный блок для создания окон и световых конструкций. Получается путём переплавки песка в печи. Пропускает свет, но не пропускает мобов. При разрушении без чар «Шёлковое касание» исчезает без дропа.', category: 'blocks', icon: '🔲', rarity: 'common', details: { type: 'Прозрачный блок', durability: 3, stackable: 64 } },
  { id: 'b5', name: 'Земля', description: 'Самый распространённый блок в игре. Превращается в траву при контакте с травяными блоками и солнечным светом. На земле можно выращивать растения, грибы и деревья. Легко добывается любым инструментом, даже руками.', category: 'blocks', icon: '🟫', rarity: 'common', details: { type: 'Природный блок', durability: 5, stackable: 64 } },
  { id: 'b6', name: 'Обсидиан', description: 'Сверхпрочный блок вулканического происхождения. Образуется при контакте воды с лавой. Требует алмазную или незеритовую кирку для добычи. Используется для создания портала в Ад. Устойчив к взрывам, идеален для защитных сооружений.', category: 'blocks', icon: '⬛', rarity: 'rare', details: { type: 'Твёрдый блок', durability: 250, stackable: 64 } },
  
  { id: 'i1', name: 'Алмазный меч', description: 'Легендарное оружие ближнего боя высочайшего качества. Наносит 7 единиц урона за удар. Обладает прочностью в 1561 использование. Можно зачаровать для усиления характеристик. Крафтится из 2 алмазов и палки.', category: 'items', icon: '⚔️', rarity: 'epic', details: { type: 'Оружие', damage: 7, durability: 1561, stackable: 1 } },
  { id: 'i2', name: 'Кирка', description: 'Основной инструмент шахтёра для добычи камня, руды и минералов. Существуют варианты из дерева, камня, железа, алмазов и незерита. Быстрее всего ломает камень и руды. Без кирки многие блоки не дропают ресурсов.', category: 'items', icon: '⛏️', rarity: 'common', details: { type: 'Инструмент', durability: 250, stackable: 1 } },
  { id: 'i3', name: 'Хлеб', description: 'Питательная еда, восстанавливающая 5 единиц голода и 6.0 насыщения. Крафтится из 3 пшеницы. Часто встречается в деревнях и сундуках. Быстро готовится и отлично подходит для путешествий.', category: 'items', icon: '🍞', rarity: 'common', details: { type: 'Еда', health: 5, stackable: 64 } },
  { id: 'i4', name: 'Зелье лечения', description: 'Магическое зелье, мгновенно восстанавливающее 4 единицы здоровья. Варится в варочной стойке из адского нароста и сверкающего арбуза. Можно усилить до зелья лечения II для восстановления 8 единиц здоровья.', category: 'items', icon: '🧪', rarity: 'rare', details: { type: 'Зелье', health: 4, stackable: 1 } },
  { id: 'i5', name: 'Удочка', description: 'Инструмент для ловли рыбы и других сокровищ из водоёмов. Можно поймать рыбу, книги с чарами, седла и другие ценные предметы. Также используется для перемещения мобов. Ломается после 65 использований.', category: 'items', icon: '🎣', rarity: 'common', details: { type: 'Инструмент', durability: 65, stackable: 1 } },
  { id: 'i6', name: 'Жемчуг Края', description: 'Редкий магический предмет, выпадающий из Эндерменов. Позволяет телепортироваться на расстояние до 30 блоков при броске. Необходим для создания Ока Края - ключа к поиску портала в Край. Наносит 5 урона при использовании.', category: 'items', icon: '🔮', rarity: 'legendary', details: { type: 'Магический предмет', damage: 5, stackable: 16 } },
  
  { id: 'm1', name: 'Крипер', description: 'Легендарный враждебный моб - символ Minecraft. Бесшумно подкрадывается к игроку и взрывается, нанося огромный урон. Дропает порох для создания ТНТ. Если убить его заряженным, выпадет голова крипера. Боится котов и оцелотов.', category: 'mobs', icon: '💥', rarity: 'common', details: { type: 'Враждебный', health: 20, damage: 49, drops: ['Порох', 'Пластинка (редко)', 'Голова крипера'] } },
  { id: 'm2', name: 'Зомби', description: 'Классический враждебный моб-нежить. Атакует игроков, жителей деревень и железных големов. Может подбирать предметы и надевать броню. Горит на солнце. Дропает гнилую плоть и редко - железные слитки, морковь или картофель.', category: 'mobs', icon: '🧟', rarity: 'common', details: { type: 'Враждебный', health: 20, damage: 3, drops: ['Гнилая плоть', 'Железо (редко)', 'Морковь', 'Картофель'] } },
  { id: 'm3', name: 'Эндермен', description: 'Загадочный моб из измерения Край. Телепортируется на короткие расстояния. Нейтрален, пока вы не посмотрите ему в глаза. Может поднимать и переносить некоторые блоки. Дропает жемчуг Края - необходимый ресурс для портала в Край.', category: 'mobs', icon: '👾', rarity: 'epic', details: { type: 'Нейтральный', health: 40, damage: 7, drops: ['Жемчуг Края'] } },
  { id: 'm4', name: 'Корова', description: 'Мирный моб-источник еды и ресурсов. Дропает сырую говядину и кожу при убийстве. Можно доить ведром для получения молока. Молоко снимает все эффекты зелий. Размножаются пшеницей. Пасутся на лугах и равнинах.', category: 'mobs', icon: '🐄', rarity: 'common', details: { type: 'Дружелюбный', health: 10, drops: ['Сырая говядина', 'Кожа', 'Молоко'] } },
  { id: 'm5', name: 'Дракон Края', description: 'Эндер Дракон - финальный босс и самый сильный моб в игре. Обитает в измерении Край. Имеет 200 единиц здоровья. Атакует огненными шарами и головой. Защищён кристаллами Края. После победы открывается выход и дропает дракон-яйцо.', category: 'mobs', icon: '🐉', rarity: 'legendary', details: { type: 'Босс', health: 200, damage: 15, drops: ['Дракон-яйцо', '12000 опыта'] } },
  { id: 'm6', name: 'Скелет', description: 'Враждебный моб-лучник нежить. Стреляет из лука по игрокам с расстояния до 15 блоков. Горит на солнце. Дропает кости для создания костной муки и стрелы. Редко дропает лук. В редких случаях может носить броню.', category: 'mobs', icon: '💀', rarity: 'common', details: { type: 'Враждебный', health: 20, damage: 4, drops: ['Кости', 'Стрелы', 'Лук (редко)'] } },
  
  { id: 'r1', name: 'Верстак', description: 'Самый важный предмет для крафта в Minecraft. Открывает доступ к сетке крафта 3x3, позволяя создавать практически все предметы в игре. Создаётся из 4 досок любого дерева. Первое, что должен создать каждый игрок.', category: 'recipes', icon: '🔨', rarity: 'common', details: { craftingTime: 'Мгновенно', ingredients: ['4x Доски любого дерева'] } },
  { id: 'r2', name: 'Меч', description: 'Базовое оружие для ближнего боя. Можно создать из разных материалов: дерево, камень, железо, золото, алмаз или незерит. Чем лучше материал, тем выше урон и прочность. Эффективнее всего против мобов.', category: 'recipes', icon: '⚔️', rarity: 'common', details: { craftingTime: 'Мгновенно', ingredients: ['2x Материал (доски/камень/железо/алмаз)', '1x Палка'] } },
  { id: 'r3', name: 'Факел', description: 'Источник света уровня 14. Предотвращает спавн враждебных мобов в радиусе освещения. Из одного угля и палки получается 4 факела. Можно размещать на стенах и полу. Незаменим для исследования пещер и ночных построек.', category: 'recipes', icon: '🔥', rarity: 'common', details: { craftingTime: 'Мгновенно', ingredients: ['1x Уголь или древесный уголь', '1x Палка'] } },
  { id: 'r4', name: 'Печь', description: 'Необходимый блок для переплавки руды, приготовления еды и создания материалов. Работает на топливе: уголь, дрова, ведро лаВы. Переплавляет железную руду в слитки, песок в стекло, сырое мясо в жареное.', category: 'recipes', icon: '🏭', rarity: 'common', details: { craftingTime: 'Мгновенно', ingredients: ['8x Булыжник'] } },
  { id: 'r5', name: 'Кровать', description: 'Позволяет пропустить ночь и установить точку возрождения. Требует 3 доски и 3 шерсти одного цвета. Нельзя использовать в Аду и Краю - взорвётся. Блокирует спавн мобов рядом. Можно красить в 16 цветов.', category: 'recipes', icon: '🛏️', rarity: 'common', details: { craftingTime: 'Мгновенно', ingredients: ['3x Доски любого дерева', '3x Шерсть любого цвета'] } },
  { id: 'r6', name: 'Книжная полка', description: 'Декоративный блок для усиления стола зачарования. Для максимального уровня чар нужно 15 полок вокруг стола. Дропает 3 книги при разрушении. Создаётся из досок и книг. Добавляет учёную атмосферу постройкам.', category: 'recipes', icon: '📚', rarity: 'rare', details: { craftingTime: 'Мгновенно', ingredients: ['6x Доски любого дерева', '3x Книги'] } },
  
  { id: 'bio1', name: 'Равнины', description: 'Один из самых распространённых и дружелюбных биомов. Идеален для строительства первой базы. Плоская местность с высокой травой и редкими дубами. Спавнятся лошади, коровы, овцы и свиньи. Часто встречаются деревни жителей и аванпосты разбойников.', category: 'biomes', icon: '🌾', rarity: 'common', details: { temperature: 'Умеренная (0.8)', structures: ['Деревни', 'Аванпосты разбойников', 'Пруды'] } },
  { id: 'bio2', name: 'Пустыня', description: 'Жаркий засушливый биом из песка и песчаника. Растут кактусы и сухие кусты. Днём яркое солнце, ночью спавн множества враждебных мобов. Можно найти храмы пустыни с сокровищами, деревни и колодцы. Обитают кролики и шелкопряды.', category: 'biomes', icon: '🏜️', rarity: 'common', details: { temperature: 'Высокая (2.0)', structures: ['Храмы пустыни', 'Деревни', 'Колодцы', 'Ископаемые'] } },
  { id: 'bio3', name: 'Джунгли', description: 'Густой тропический лес с огромными деревьями высотой до 30 блоков. Богат ресурсами: какао-бобы, бамбук, арбузы. Обитают попугаи, оцелоты и панды. Можно найти храмы джунглей с механизмами и сокровищами. Сложно передвигаться из-за густой растительности.', category: 'biomes', icon: '🌴', rarity: 'rare', details: { temperature: 'Высокая (0.95)', structures: ['Храмы джунглей', 'Бамбуковые рощи'] } },
  { id: 'bio4', name: 'Тайга', description: 'Холодный хвойный лес с высокими елями и папоротниками. Покрыт снегом в некоторых вариациях. Водоёмы часто замерзают. Спавнятся волки, лисы и кролики. Встречаются деревни и аванпосты. Хороший источник древесины ели.', category: 'biomes', icon: '🌲', rarity: 'common', details: { temperature: 'Холодная (0.25)', structures: ['Деревни', 'Аванпосты', 'Иглу'] } },
  { id: 'bio5', name: 'Грибной остров', description: 'Редчайший биом в игре - небольшие острова, покрытые мицелием. Растут гигантские грибы. Обитают только грибные коровы - источник бесконечного грибного супа. Не спавнятся враждебные мобы! Идеальное безопасное место для базы.', category: 'biomes', icon: '🍄', rarity: 'legendary', details: { temperature: 'Умеренная (0.9)', structures: ['Гигантские грибы'] } },
  { id: 'bio6', name: 'Ледяные шипы', description: 'Экстремально редкий вариант снежной тундры с уникальными структурами - ледяными шипами высотой до 50 блоков. Полностью покрыт упакованным льдом и снегом. Очень холодный. Спавнятся белые медведи и кролики. Сложный для выживания, но красивый биом.', category: 'biomes', icon: '❄️', rarity: 'epic', details: { temperature: 'Очень холодная (0.0)', structures: ['Ледяные шипы', 'Иглу'] } },
];

const categoryNames = {
  blocks: 'Блоки',
  items: 'Предметы',
  mobs: 'Мобы',
  recipes: 'Рецепты',
  biomes: 'Биомы',
};

const rarityColors = {
  common: 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 border border-gray-300',
  rare: 'bg-gradient-to-r from-blue-100 to-cyan-200 text-blue-800 border border-blue-300',
  epic: 'bg-gradient-to-r from-purple-100 to-pink-200 text-purple-800 border border-purple-300',
  legendary: 'bg-gradient-to-r from-amber-100 to-orange-200 text-orange-900 border border-orange-300',
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
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);

  const filteredData = minecraftData.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeTab === 'all' || item.category === activeTab;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b sticky top-0 z-10 backdrop-blur-lg bg-gradient-minecraft shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="text-5xl drop-shadow-lg">⛏️</div>
            <div>
              <h1 className="text-3xl font-bold text-white drop-shadow-md">Minecraft Wiki</h1>
              <p className="text-sm text-white/90">Полный справочник по игре</p>
            </div>
          </div>
          
          <div className="relative">
            <Icon name="Search" className="absolute left-3 top-1/2 -translate-y-1/2 text-primary" size={20} />
            <Input
              type="text"
              placeholder="Поиск блоков, предметов, мобов..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12 text-base bg-white/90 backdrop-blur border-white/50 focus:border-white focus:ring-white"
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
                <Card key={item.id} className="card-hover-glow transition-all duration-300 hover:-translate-y-2 cursor-pointer border-2 overflow-hidden" onClick={() => setSelectedItem(item)}>
                  <CardContent className="p-6 bg-gradient-to-br from-white to-gray-50">
                    <div className="flex items-start gap-4">
                      <div className="text-5xl drop-shadow-md transform hover:scale-110 transition-transform duration-200">{item.icon}</div>
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

      <Dialog open={!!selectedItem} onOpenChange={() => setSelectedItem(null)}>
        <DialogContent className="max-w-2xl">
          {selectedItem && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-4">
                  <div className="text-6xl">{selectedItem.icon}</div>
                  <div className="flex-1">
                    <DialogTitle className="text-2xl mb-2">{selectedItem.name}</DialogTitle>
                    <div className="flex items-center gap-2">
                      {selectedItem.rarity && (
                        <Badge className={rarityColors[selectedItem.rarity]} variant="secondary">
                          {rarityNames[selectedItem.rarity]}
                        </Badge>
                      )}
                      <Badge variant="outline">
                        {categoryNames[selectedItem.category as keyof typeof categoryNames]}
                      </Badge>
                    </div>
                  </div>
                </div>
              </DialogHeader>

              <Separator className="my-4" />

              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-sm text-muted-foreground mb-2 flex items-center gap-2">
                    <Icon name="FileText" size={16} />
                    Описание
                  </h4>
                  <p className="text-foreground">{selectedItem.description}</p>
                </div>

                {selectedItem.details && (
                  <div className="grid grid-cols-2 gap-4">
                    {selectedItem.details.type && (
                      <div className="bg-muted/50 p-3 rounded-lg">
                        <div className="text-xs text-muted-foreground mb-1">Тип</div>
                        <div className="font-medium">{selectedItem.details.type}</div>
                      </div>
                    )}
                    {selectedItem.details.health !== undefined && (
                      <div className="bg-muted/50 p-3 rounded-lg">
                        <div className="text-xs text-muted-foreground mb-1">Здоровье</div>
                        <div className="font-medium flex items-center gap-1">
                          <Icon name="Heart" size={16} className="text-red-500" />
                          {selectedItem.details.health}
                        </div>
                      </div>
                    )}
                    {selectedItem.details.damage !== undefined && (
                      <div className="bg-muted/50 p-3 rounded-lg">
                        <div className="text-xs text-muted-foreground mb-1">Урон</div>
                        <div className="font-medium flex items-center gap-1">
                          <Icon name="Sword" size={16} className="text-orange-500" />
                          {selectedItem.details.damage}
                        </div>
                      </div>
                    )}
                    {selectedItem.details.durability !== undefined && (
                      <div className="bg-muted/50 p-3 rounded-lg">
                        <div className="text-xs text-muted-foreground mb-1">Прочность</div>
                        <div className="font-medium">{selectedItem.details.durability}</div>
                      </div>
                    )}
                    {selectedItem.details.stackable !== undefined && (
                      <div className="bg-muted/50 p-3 rounded-lg">
                        <div className="text-xs text-muted-foreground mb-1">Стакается</div>
                        <div className="font-medium">{selectedItem.details.stackable}</div>
                      </div>
                    )}
                    {selectedItem.details.craftingTime && (
                      <div className="bg-muted/50 p-3 rounded-lg">
                        <div className="text-xs text-muted-foreground mb-1">Время крафта</div>
                        <div className="font-medium">{selectedItem.details.craftingTime}</div>
                      </div>
                    )}
                    {selectedItem.details.temperature && (
                      <div className="bg-muted/50 p-3 rounded-lg">
                        <div className="text-xs text-muted-foreground mb-1">Температура</div>
                        <div className="font-medium">{selectedItem.details.temperature}</div>
                      </div>
                    )}
                  </div>
                )}

                {selectedItem.details?.ingredients && (
                  <div>
                    <h4 className="font-semibold text-sm text-muted-foreground mb-2 flex items-center gap-2">
                      <Icon name="List" size={16} />
                      Ингредиенты
                    </h4>
                    <ul className="space-y-1">
                      {selectedItem.details.ingredients.map((ingredient, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm">
                          <Icon name="ChevronRight" size={14} className="text-primary" />
                          {ingredient}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {selectedItem.details?.structures && (
                  <div>
                    <h4 className="font-semibold text-sm text-muted-foreground mb-2 flex items-center gap-2">
                      <Icon name="Home" size={16} />
                      Структуры
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedItem.details.structures.map((structure, i) => (
                        <Badge key={i} variant="outline">{structure}</Badge>
                      ))}
                    </div>
                  </div>
                )}

                {selectedItem.details?.drops && (
                  <div>
                    <h4 className="font-semibold text-sm text-muted-foreground mb-2 flex items-center gap-2">
                      <Icon name="Gift" size={16} />
                      Дроп
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedItem.details.drops.map((drop, i) => (
                        <Badge key={i} variant="secondary">{drop}</Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Index;