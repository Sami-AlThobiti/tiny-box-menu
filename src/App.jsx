import React, { useState, useRef, useEffect } from 'react';
import { 
  Coffee, Utensils, IceCream, Search, Star, Flame, 
  Info, Sparkles, MessageCircle, X, Send, Bot, ArrowRight 
} from 'lucide-react';

// --- إعدادات المساعد الذكي ---
const apiKey = ""; // اتركها فارغة لتفعيل "وضع المحاكاة الذكي"

const MENU_DATA = {
  kunafa: {
    id: 'kunafa',
    title: "الكنافة",
    description: "أصناف الكنافة المحشوة واللذيذة",
    icon: <Flame className="w-8 h-8 text-orange-500" />,
    items: [
      {
        id: 1,
        name: "كنافة قشطة تقليدية",
        description: "الحشوة الكلاسيكية المحبوبة",
        image: "/images/kunafa-cream.jpg",
        prices: [
          { size: "جونيور", price: 5, cal: 260 },
          { size: "هابي", price: 9, cal: 399 },
          { size: "فملي", price: 40, cal: 1620 },
          { size: "بارتي", price: 50, cal: 2320 },
        ],
        tag: "الأكثر مبيعاً"
      },
      {
        id: 2,
        name: "كنافة موز",
        description: "مزيج رائع من القشطة والموز الطازج",
        image: "/images/kunafa-banana.jpg",
        prices: [
          { size: "جونيور", price: 6, cal: 260 },
          { size: "هابي", price: 12, cal: 930 },
          { size: "فملي", price: 45, cal: 1240 },
          { size: "بارتي", price: 60, cal: 1526 },
        ]
      },
      {
        id: 3,
        name: "كنافة تايني بوكس",
        description: "خلطتنا الخاصة والمميزة (سيجنتشر)",
        image: "/images/tiny-special.jpg",
        prices: [
          { size: "جونيور", price: 10, cal: 502 },
          { size: "هابي", price: 16, cal: 1134 },
          { size: "فملي", price: 70, cal: 1596 },
          { size: "بارتي", price: 80, cal: 1800 },
        ],
        tag: "سيجنتشر"
      },
      {
        id: 4,
        name: "كنافة جبنة / مفستقة",
        description: "اختيارات الأجبان السائلة، كيري، أو الفستق الغني",
        image: "/images/cheese.jpg",
        prices: [
          { size: "جونيور", price: 6, cal: 274 },
          { size: "هابي", price: 14, cal: 974 },
          { size: "فملي", price: 60, cal: 1250 },
          { size: "بارتي", price: 70, cal: 1596 },
        ]
      }
    ]
  },
  chocokunafa: {
    id: 'chocokunafa',
    title: "كنافة الشوكولاتة",
    description: "لعشاق الشوكولاتة العالمية",
    icon: <Star className="w-8 h-8 text-pink-500" />,
    items: [
      {
        id: 10,
        name: "تشكيلة الشوكولاتة العالمية",
        description: "أضف نكهتك المفضلة (كيندر، نوتيلا، لوتس، بستاشيو...)",
        image: "/images/choco.jpg",
        prices: [
            { size: "إضافة صوص", price: "حسب الطلب", cal: "300-500" }
        ],
        flavors: ["نوتيلا", "لوتس", "كيندر", "بستاشيو", "جلاكسي", "أوريو", "كتكات", "مارس", "سنيكرز"]
      }
    ]
  },
  sweets: {
    id: 'sweets',
    title: "الحلويات والميني",
    description: "دونات كنافة، لقيمات، وبسبوسة",
    icon: <IceCream className="w-8 h-8 text-purple-500" />,
    items: [
      {
        id: 20,
        name: "دونات الكنافة",
        description: "ابداع جديد يجمع بين الدونات والكنافة",
        image: "/images/donut.jpg",
        prices: [
          { size: "قطعة صغيرة", price: 5, cal: 687 },
          { size: "قطعة كبيرة", price: 7, cal: 768 },
          { size: "بوكس (6)", price: 29, cal: 800 },
        ]
      },
      {
        id: 21,
        name: "ميني & نانو كنافة",
        description: "قطع صغيرة للمشاركة والمناسبات",
        image: "/images/mini.jpg",
        prices: [
          { size: "12 قطعة نانو", price: 19, cal: 687 },
          { size: "24 قطعة نانو", price: 39, cal: 768 },
          { size: "10 قطع سيركل", price: 49, cal: 800 },
        ]
      },
      {
        id: 22,
        name: "لقيمات",
        description: "لقيمات ذهبية مقرمشة",
        image: "/images/luqaimat.jpg",
        prices: [
          { size: "صغير (S)", price: 5, cal: null },
          { size: "وسط (M)", price: 10, cal: null },
        ]
      },
      {
        id: 23,
        name: "بسبوسة",
        description: "بسبوسة محضرة يدوياً بالقشطة أو سادة",
        image: "/images/basbousa.jpg",
        prices: [
          { size: "سادة S", price: 10, cal: null },
          { size: "قشطة S", price: 15, cal: null },
        ]
      }
    ]
  },
  drinks: {
    id: 'drinks',
    title: "المشروبات",
    description: "قهوة عربية، مختصة، وباردة",
    icon: <Coffee className="w-8 h-8 text-amber-600" />,
    items: [
      {
        id: 30,
        name: "القهوة العربية",
        description: "قهوة سعودية فاخرة بالهيل والزعفران",
        image: "/images/saudi-coffee.jpg",
        prices: [
          { size: "كوب", price: 6, cal: null },
          { size: "دلة (S)", price: 25, cal: null },
          { size: "دلة (M)", price: 50, cal: null },
        ]
      },
      {
        id: 31,
        name: "مشروبات ساخنة",
        description: "تشكيلة من الشاي والقهوة التركية",
        image: "/images/tea.jpg",
        prices: [
          { size: "شاي", price: 5, cal: null },
          { size: "كرك", price: 6, cal: null },
          { size: "قهوة تركي", price: 9, cal: null },
        ]
      },
      {
        id: 32,
        name: "القهوة المختصة",
        description: "إسبريسو، لاتيه، كابتشينو",
        image: "/images/latte.jpg",
        prices: [
          { size: "إسبريسو", price: 8, cal: null },
          { size: "لاتيه", price: 12, cal: null },
          { size: "V60", price: 15, cal: null },
        ]
      },
      {
        id: 33,
        name: "مشروبات باردة",
        description: "موهيتو، ايس تي، ومشروبات غازية",
        image: "/images/mojito.jpg",
        prices: [
          { size: "غازي", price: 5, cal: null },
          { size: "موهيتو", price: 15, cal: null },
          { size: "V60 بارد", price: 15, cal: null },
        ]
      }
    ]
  }
};

// --- المكونات الفرعية ---

const PriceTag = ({ label, price, cal }) => (
  <div className="flex justify-between items-center p-2 rounded bg-zinc-800/50 border border-zinc-700/50">
    <div className="flex flex-col">
      <span className="text-xs text-zinc-400">{label}</span>
      {cal && <span className="text-[10px] text-zinc-500">{cal} cal</span>}
    </div>
    <span className="font-bold text-orange-400 font-mono text-sm">
      {price} <span className="text-[10px]">ر.س</span>
    </span>
  </div>
);

const MenuItem = ({ item }) => (
  <div className="group bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800 shadow-lg animate-in fade-in zoom-in duration-300">
    <div className="relative h-40 bg-zinc-800 overflow-hidden">
        {/* Placeholder Image Logic */}
        <div className="absolute inset-0 bg-zinc-800 flex items-center justify-center text-zinc-600">
            {item.image && item.image.includes('images') ? (
               <img src={item.image} alt={item.name} className="w-full h-full object-cover opacity-80 group-hover:scale-110 transition-transform duration-500" onError={(e) => e.target.style.display='none'} />
            ) : null}
            <Utensils className="w-10 h-10 opacity-20 absolute" />
        </div>
        
        {item.tag && (
        <span className="absolute top-3 right-3 bg-orange-600 text-white text-[10px] font-bold px-2 py-1 rounded-full shadow-lg z-10">
            {item.tag}
        </span>
        )}
        <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-zinc-900 to-transparent h-20" />
        <h3 className="absolute bottom-2 right-3 text-lg font-bold text-white drop-shadow-md z-10">
            {item.name}
        </h3>
    </div>
    
    <div className="p-4">
      <p className="text-zinc-400 text-xs mb-4 min-h-[40px] leading-relaxed">
        {item.description}
      </p>

      {item.flavors && (
         <div className="mb-4 flex flex-wrap gap-1">
             {item.flavors.map(f => (
                 <span key={f} className="text-[10px] px-2 py-1 bg-zinc-800 rounded text-zinc-400 border border-zinc-700">{f}</span>
             ))}
         </div>
      )}

      <div className="grid grid-cols-2 gap-2">
        {item.prices.map((price, idx) => (
          <PriceTag 
            key={idx} 
            label={price.size} 
            price={price.price} 
            cal={price.cal} 
          />
        ))}
      </div>
    </div>
  </div>
);

const CategoryCard = ({ category, onClick }) => (
    <button 
        onClick={onClick}
        className="relative w-full h-32 bg-zinc-900 rounded-2xl border border-zinc-800 flex items-center justify-between px-6 overflow-hidden group hover:border-orange-500/50 transition-all shadow-lg"
    >
        <div className="z-10 text-right">
            <h3 className="text-xl font-bold text-white mb-1 group-hover:text-orange-400 transition-colors">
                {category.title}
            </h3>
            <p className="text-xs text-zinc-500">{category.description}</p>
        </div>
        <div className="z-10 bg-zinc-800 p-4 rounded-full group-hover:bg-orange-500/20 group-hover:scale-110 transition-all duration-300">
            {category.icon}
        </div>
        <div className="absolute -left-4 -bottom-4 w-24 h-24 bg-gradient-to-tr from-orange-500/10 to-transparent rounded-full blur-xl" />
    </button>
);

// --- نافذة الشات الذكي (تم إصلاح مشكلة الإدخال) ---
const AIChatModal = ({ isOpen, onClose }) => {
    const [messages, setMessages] = useState([
        { role: 'assistant', text: 'هلا والله! 👋 أنا مساعد تايني. محتار وش تطلب؟ علمني كم شخص أنتم أو وش مشتهي (حالي، قهوة..) وأنا أضبطك! ✨' }
    ]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen]);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMessage = { role: 'user', text: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setLoading(true);

        // --- محاكاة الرد الذكي (يعمل دائماً حتى بدون مفتاح) ---
        setTimeout(() => {
            let reply = "بما أننا في وضع التجربة، أنصحك بـ 'كنافة تايني بوكس' فهي الأكثر طلباً لدينا! 😋 ومعها قهوة عربية تضبط الراس.";
            const lowerInput = userMessage.text.toLowerCase();

            // ردود ذكية مخصصة
            if (lowerInput.includes('قهوة') || lowerInput.includes('coffee')) {
                reply = "يا سلام على المزاج! ☕ أنصحك تجرب الـ V60 عندنا إذا تحب القهوة السوداء، أو خذ لك 'دلة قهوة عربية' مع الكنافة.. الطعم خيال!";
            } else if (lowerInput.includes('حالي') || lowerInput.includes('سكر') || lowerInput.includes('حلو')) {
                reply = "تبي شيء يخلي يومك حلو؟ 🍯 جرب 'كنافة القشطة التقليدية' أو 'كنافة الشوكولاتة' إذا أنت من عشاق النوتيلا واللوتس!";
            } else if (lowerInput.includes('سعر') || lowerInput.includes('بكم') || lowerInput.includes('فلوس')) {
                reply = "أسعارنا تناسب الجميع! 😉 تبدأ من 5 ريال للأحجام الصغيرة (جونيور) وتوصل 80 ريال لأحجام الحفلات (بارتي). وش ميزانيتك اليوم؟";
            } else if (lowerInput.includes('شخص') || lowerInput.includes('اشخاص') || lowerInput.includes('عزيمة')) {
                reply = "عندك جمعة؟ 🎉 أنصحك بحجم 'فملي' أو 'بارتي'، كمية راهية وتبيض الوجه!";
            } else if (lowerInput.includes('مالح') || lowerInput.includes('جبن')) {
                reply = "أكيد! جرب كنافة الجبنة السائلة، طعم الملوحة مع حلاوة الشيرة شيء من الآخر 🧀";
            }

            // إذا كان هناك مفتاح API حقيقي، يمكن تفعيل الكود التالي (تم تعطيله حالياً لضمان العمل)
            /*
            if (apiKey) {
                 // ... API logic here
            }
            */

            setMessages(prev => [...prev, { role: 'assistant', text: reply }]);
            setLoading(false);
        }, 1000);
    };

    if (!isOpen) return null;

    return (
        // تم إصلاح CSS هنا: إزالة pointer-events-none من الحاوية لضمان عمل الإدخال
        <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center">
            {/* الخلفية المعتمة */}
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
            
            {/* المودال */}
            <div className="relative bg-zinc-900 w-full sm:w-[400px] h-[80vh] sm:h-[600px] rounded-t-3xl sm:rounded-2xl shadow-2xl flex flex-col border border-zinc-800 animate-in slide-in-from-bottom duration-300">
                <div className="p-4 border-b border-zinc-800 flex justify-between items-center bg-zinc-950/80 rounded-t-3xl sm:rounded-t-2xl">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-orange-500 to-amber-500 flex items-center justify-center">
                            <Bot className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <h3 className="font-bold text-white text-sm">مساعد تايني</h3>
                            <p className="text-[10px] text-green-400 flex items-center gap-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                                متصل الآن
                            </p>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-zinc-800 rounded-full text-zinc-400 transition-colors">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-zinc-900/50">
                    {messages.map((msg, idx) => (
                        <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[85%] rounded-2xl p-3 text-sm leading-relaxed ${
                                msg.role === 'user' ? 'bg-orange-600 text-white rounded-tr-none' : 'bg-zinc-800 text-zinc-200 rounded-tl-none border border-zinc-700'
                            }`}>{msg.text}</div>
                        </div>
                    ))}
                    {loading && (
                        <div className="flex justify-start">
                            <div className="bg-zinc-800 rounded-2xl rounded-tl-none p-3 border border-zinc-700">
                                <div className="flex gap-1">
                                    <span className="w-1.5 h-1.5 bg-zinc-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                    <span className="w-1.5 h-1.5 bg-zinc-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                    <span className="w-1.5 h-1.5 bg-zinc-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                                </div>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                <div className="p-4 bg-zinc-950 border-t border-zinc-800">
                    <div className="flex gap-2">
                        <input
                            autoFocus
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                            placeholder="اكتب رسالتك..."
                            className="flex-1 bg-zinc-800 border-zinc-700 text-white rounded-full px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/50 placeholder:text-zinc-600"
                        />
                        <button 
                            onClick={handleSend}
                            disabled={!input.trim()}
                            className="bg-orange-500 text-white p-3 rounded-full hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                        >
                            <Send className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- التطبيق الرئيسي ---
export default function App() {
  const [view, setView] = useState('home'); 
  const [activeCategory, setActiveCategory] = useState(null);
  const [isAIChatOpen, setIsAIChatOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const getSearchResults = () => {
    if (!searchQuery.trim()) return [];
    let results = [];
    Object.values(MENU_DATA).forEach(cat => {
        cat.items.forEach(item => {
            if (item.name.includes(searchQuery) || item.description.includes(searchQuery)) {
                results.push(item);
            }
        });
    });
    return results;
  };

  const handleSearchToggle = () => {
      if (view === 'search') {
          setView('home');
          setSearchQuery('');
      } else {
          setView('search');
      }
  };

  return (
    <div className="min-h-screen bg-zinc-950 font-sans text-right relative pb-24" dir="rtl">
      
      {/* Header */}
      <header className="bg-zinc-900/90 backdrop-blur-md text-white sticky top-0 z-50 border-b border-zinc-800">
        <div className="container mx-auto px-4 py-4">
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-3 cursor-pointer" onClick={() => setView('home')}>
                    {view !== 'home' && (
                        <button className="p-1 rounded-full bg-zinc-800 hover:bg-zinc-700 transition-colors">
                            <ArrowRight className="w-5 h-5 text-zinc-300" />
                        </button>
                    )}
                    <div>
                        <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-amber-200">
                        تايني بوكس
                        </h1>
                    </div>
                </div>
                <div className="flex gap-2">
                    <button 
                        onClick={() => setIsAIChatOpen(true)}
                        className="flex items-center gap-1 bg-gradient-to-r from-indigo-600 to-violet-600 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg shadow-indigo-500/20 active:scale-95 transition-transform"
                    >
                        <Sparkles className="w-3 h-3" />
                        مساعد
                    </button>
                    <button 
                        onClick={handleSearchToggle}
                        className={`p-2 rounded-full transition-colors ${view === 'search' ? 'bg-orange-500 text-white' : 'bg-zinc-800 text-zinc-400'}`}
                    >
                        <Search className="w-5 h-5" />
                    </button>
                </div>
            </div>
            
            {view === 'search' && (
                <div className="mt-3 animate-in slide-in-from-top-2">
                    <input 
                        autoFocus
                        type="text" 
                        placeholder="ابحث عن كنافة، قهوة..." 
                        className="w-full bg-zinc-800 border border-zinc-700 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-orange-500/50"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            )}
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-6">
        
        {view === 'home' && (
            <div className="space-y-6 animate-in fade-in duration-500">
                <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold text-white mb-2">وش بخاطرك اليوم؟ 😋</h2>
                    <p className="text-zinc-500 text-sm">اختر القسم وتصفح المنيو</p>
                </div>
                <div className="grid gap-4">
                    {Object.values(MENU_DATA).map(cat => (
                        <CategoryCard 
                            key={cat.id} 
                            category={cat} 
                            onClick={() => {
                                setActiveCategory(cat);
                                setView('category');
                            }} 
                        />
                    ))}
                </div>
            </div>
        )}

        {view === 'category' && activeCategory && (
            <div className="animate-in slide-in-from-left duration-300">
                <div className="mb-6 flex items-center gap-2">
                   <div className="p-2 bg-zinc-800 rounded-lg text-orange-500">
                       {activeCategory.icon}
                   </div>
                   <h2 className="text-xl font-bold text-white">{activeCategory.title}</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {activeCategory.items.map(item => (
                        <MenuItem key={item.id} item={item} />
                    ))}
                </div>
            </div>
        )}

        {view === 'search' && (
            <div className="animate-in fade-in">
                {searchQuery.trim() === '' ? (
                    <div className="text-center text-zinc-500 mt-10">
                        <Search className="w-12 h-12 mx-auto mb-4 opacity-20" />
                        <p>اكتب اسم الطبق للبحث...</p>
                    </div>
                ) : (
                    <div>
                        <h3 className="text-zinc-400 mb-4 text-sm">نتائج البحث:</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {getSearchResults().length > 0 ? (
                                getSearchResults().map(item => (
                                    <MenuItem key={item.id} item={item} />
                                ))
                            ) : (
                                <p className="text-center text-zinc-500 col-span-full">لا توجد نتائج مطابقة 😔</p>
                            )}
                        </div>
                    </div>
                )}
            </div>
        )}

      </main>

      <button 
        onClick={() => setIsAIChatOpen(true)}
        className="fixed bottom-6 left-6 bg-gradient-to-r from-orange-500 to-pink-600 text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform z-40"
      >
        <MessageCircle className="w-6 h-6 animate-bounce" />
      </button>

      <AIChatModal isOpen={isAIChatOpen} onClose={() => setIsAIChatOpen(false)} />
    </div>
  );
}


