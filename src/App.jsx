import React, { useState, useRef, useEffect } from 'react';
import { Coffee, Utensils, IceCream, Search, ChevronRight, Star, Flame, Info, Sparkles, MessageCircle, X, Send, Bot } from 'lucide-react';

const apiKey = ""; // سيتم توفير المفتاح تلقائياً

const MENU_DATA = {
  kunafa: {
    title: "الكنافة",
    icon: <Flame className="w-5 h-5" />,
    items: [
      {
        id: 1,
        name: "كنافة قشطة تقليدية",
        description: "الحشوة الكلاسيكية المحبوبة",
        image: "",
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
        image: "",
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
        description: "خلطتنا الخاصة والمميزة",
        image: "",
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
        image: "",
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
    title: "كنافة الشوكولاتة",
    icon: <Star className="w-5 h-5" />,
    items: [
      {
        id: 10,
        name: "تشكيلة الشوكولاتة العالمية",
        description: "أضف نكهتك المفضلة على الكنافة (كيندر، نوتيلا، لوتس، بستاشيو، جلاكسي، وأكثر...)",
        image: "",
        prices: [
            { size: "إضافة صوص", price: "حسب الطلب", cal: "300-500" }
        ],
        flavors: ["نوتيلا", "لوتس", "كيندر", "بستاشيو", "جلاكسي", "أوريو", "كتكات", "مارس", "سنيكرز", "رافيلو", "فيريرو روشيه"]
      }
    ]
  },
  sweets: {
    title: "الحلويات والميني",
    icon: <IceCream className="w-5 h-5" />,
    items: [
      {
        id: 20,
        name: "دونات الكنافة",
        description: "ابداع جديد يجمع بين الدونات والكنافة",
        image: "",
        prices: [
          { size: "قطعة صغيرة", price: 5, cal: 687 },
          { size: "قطعة كبيرة", price: 7, cal: 768 },
          { size: "بوكس صغير (6)", price: 29, cal: 800 },
          { size: "بوكس كبير (6)", price: 39, cal: 878 },
        ]
      },
      {
        id: 21,
        name: "ميني & نانو كنافة",
        description: "قطع صغيرة للمشاركة والمناسبات",
        image: "",
        prices: [
          { size: "12 قطعة نانو", price: 19, cal: 687 },
          { size: "24 قطعة نانو", price: 39, cal: 768 },
          { size: "10 قطع سيركل", price: 49, cal: 800 },
          { size: "8 قطع ريكتانجل", price: 49, cal: 878 },
        ]
      },
      {
        id: 22,
        name: "لقيمات",
        description: "لقيمات ذهبية مقرمشة",
        image: "",
        prices: [
          { size: "صغير (S)", price: 5, cal: null },
          { size: "وسط (M)", price: 10, cal: null },
        ]
      },
      {
        id: 23,
        name: "بسبوسة",
        description: "بسبوسة محضرة يدوياً",
        image: "",
        prices: [
          { size: "سادة صغير", price: 10, cal: null },
          { size: "سادة وسط", price: 20, cal: null },
          { size: "قشطة صغير", price: 15, cal: null },
          { size: "قشطة وسط", price: 30, cal: null },
        ]
      }
    ]
  },
  drinks: {
    title: "المشروبات",
    icon: <Coffee className="w-5 h-5" />,
    items: [
      {
        id: 30,
        name: "القهوة العربية",
        description: "قهوة سعودية فاخرة بالهيل والزعفران",
        image: "",
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
        image: "",
        prices: [
          { size: "شاي (أحمر/أخضر)", price: 5, cal: null },
          { size: "شاي كرك/عدني", price: 6, cal: null },
          { size: "قهوة تركي", price: 9, cal: null },
          { size: "هوت شوكليت", price: 10, cal: null },
        ]
      },
      {
        id: 32,
        name: "القهوة المختصة والإسبريسو",
        description: "V60، لاتيه، كابتشينو والمزيد",
        image: "",
        prices: [
          { size: "إسبريسو", price: 8, cal: null },
          { size: "أمريكانو", price: 8, cal: null },
          { size: "كابتشينو / لاتيه", price: 12, cal: null },
          { size: "سبانش لاتيه", price: 15, cal: null },
          { size: "V60", price: 15, cal: null },
        ]
      },
      {
        id: 33,
        name: "مشروبات باردة",
        description: "موهيتو، ايس تي، ومشروبات غازية",
        image: "",
        prices: [
          { size: "مشروب غازي", price: 5, cal: null },
          { size: "ماء", price: 1, cal: null },
          { size: "موهيتو / كودرد", price: 15, cal: null },
          { size: "V60 بارد", price: 15, cal: null },
        ]
      }
    ]
  }
};

const Header = ({ onSuggestionClick }) => (
  <header className="bg-zinc-900 text-white sticky top-0 z-50 shadow-xl border-b border-zinc-800">
    <div className="container mx-auto px-4 py-4 flex justify-between items-center">
      <div>
        <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-amber-200">
          تايني بوكس
        </h1>
        <p className="text-xs text-zinc-400">Kunafa & Coffee</p>
      </div>
      <div className="flex gap-2">
        <button 
            onClick={onSuggestionClick}
            className="flex items-center gap-1 bg-gradient-to-r from-indigo-600 to-violet-600 text-white px-3 py-2 rounded-full text-xs font-bold hover:from-indigo-500 hover:to-violet-500 transition-all shadow-lg shadow-indigo-500/20"
        >
            <Sparkles className="w-3 h-3" />
            اقترح لي
        </button>
        <button className="p-2 rounded-full bg-zinc-800 hover:bg-zinc-700 transition-colors">
            <Search className="w-5 h-5 text-orange-400" />
        </button>
      </div>
    </div>
  </header>
);

const CategoryTabs = ({ activeTab, setActiveTab }) => (
  <div className="flex overflow-x-auto gap-2 p-4 bg-zinc-950 sticky top-[72px] z-40 no-scrollbar">
    {Object.entries(MENU_DATA).map(([key, data]) => (
      <button
        key={key}
        onClick={() => setActiveTab(key)}
        className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-all duration-300 ${
          activeTab === key
            ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/20'
            : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'
        }`}
      >
        {data.icon}
        <span className="font-medium text-sm">{data.title}</span>
      </button>
    ))}
  </div>
);

const PriceTag = ({ label, price, cal }) => (
  <div className="flex justify-between items-center p-2 rounded bg-zinc-800/50 border border-zinc-700/50 hover:border-orange-500/30 transition-colors">
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
  <div className="group bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800 hover:border-orange-500/50 transition-all duration-300 shadow-lg hover:shadow-orange-500/10">
    <div className="relative h-40 bg-zinc-800 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-700 to-zinc-900 group-hover:scale-105 transition-transform duration-500 flex items-center justify-center text-zinc-600">
             <Utensils className="w-12 h-12 opacity-20" />
        </div>
        {item.tag && (
        <span className="absolute top-3 right-3 bg-orange-500 text-white text-[10px] font-bold px-2 py-1 rounded-full shadow-lg">
            {item.tag}
        </span>
        )}
        <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-zinc-900 to-transparent h-20" />
        <h3 className="absolute bottom-3 right-3 text-lg font-bold text-white drop-shadow-md">
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

const Footer = () => (
    <div className="bg-zinc-900 border-t border-zinc-800 p-6 mt-20 text-center text-zinc-500 text-xs">
        <div className="flex justify-center gap-4 mb-4">
            <div className="p-3 bg-zinc-800 rounded-full">
                <Info className="w-4 h-4 text-orange-500" />
            </div>
        </div>
        <p className="mb-2">مواعيد العمل: 2:00 م - 2:00 ص</p>
        <div className="flex justify-center gap-4 text-orange-400 font-mono">
            <a href="tel:0566407817">0566407817</a>
            <span>|</span>
            <a href="tel:0505716872">0505716872</a>
        </div>
        <p className="mt-6 opacity-30">Designed for Tiny Box</p>
    </div>
);

// --- AI Components ---

const AIChatModal = ({ isOpen, onClose }) => {
    const [messages, setMessages] = useState([
        { role: 'assistant', text: 'مرحباً! أنا مساعد تايني الذكي ✨. بماذا تشعر اليوم؟ (مثلاً: أبغى شيء حالي، عندي عزيمة، جوعان...)' }
    ]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMessage = { role: 'user', text: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setLoading(true);

        try {
            const systemPrompt = `
                You are a friendly, enthusiastic waiter at "Tiny Box" (a Kunafa & Coffee shop).
                You speak Arabic (Gulf/Saudi dialect).
                Your goal is to suggest items from the following MENU_DATA based on the user's request.
                
                MENU_DATA: ${JSON.stringify(MENU_DATA)}

                Rules:
                1. Only suggest items that are in the menu.
                2. If the user asks for something vague (e.g., "something sweet"), suggest 2-3 specific options with reasons.
                3. Be concise and use appetizing emojis (😋, ☕, ✨).
                4. Do not make up prices or items not in the list.
                5. If asked about calories, use the data provided.
                
                User Query: ${input}
            `;

            const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [{ parts: [{ text: systemPrompt }] }]
                })
            });

            const data = await response.json();
            const aiText = data.candidates?.[0]?.content?.parts?.[0]?.text || "عذراً، لم أستطع فهم طلبك. هل يمكنك الإعادة؟";
            
            setMessages(prev => [...prev, { role: 'assistant', text: aiText }]);
        } catch (error) {
            console.error(error);
            setMessages(prev => [...prev, { role: 'assistant', text: "حدث خطأ في الاتصال، يرجى المحاولة لاحقاً." }]);
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center pointer-events-none">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm pointer-events-auto" onClick={onClose} />
            
            {/* Modal */}
            <div className="bg-zinc-900 w-full sm:w-[400px] h-[80vh] sm:h-[600px] rounded-t-3xl sm:rounded-2xl shadow-2xl flex flex-col pointer-events-auto border border-zinc-800 animate-in slide-in-from-bottom duration-300">
                {/* Header */}
                <div className="p-4 border-b border-zinc-800 flex justify-between items-center bg-zinc-950/50 rounded-t-3xl sm:rounded-t-2xl">
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
                    <button onClick={onClose} className="p-2 hover:bg-zinc-800 rounded-full transition-colors text-zinc-400">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-zinc-900/50">
                    {messages.map((msg, idx) => (
                        <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[80%] rounded-2xl p-3 text-sm leading-relaxed ${
                                msg.role === 'user' 
                                    ? 'bg-orange-600 text-white rounded-tr-none' 
                                    : 'bg-zinc-800 text-zinc-200 rounded-tl-none border border-zinc-700'
                            }`}>
                                {msg.text}
                            </div>
                        </div>
                    ))}
                    {loading && (
                        <div className="flex justify-start">
                            <div className="bg-zinc-800 rounded-2xl rounded-tl-none p-3 border border-zinc-700 flex gap-1">
                                <span className="w-2 h-2 bg-zinc-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                <span className="w-2 h-2 bg-zinc-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                <span className="w-2 h-2 bg-zinc-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div className="p-4 bg-zinc-950 border-t border-zinc-800">
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                            placeholder="اكتب رسالتك..."
                            className="flex-1 bg-zinc-800 border-zinc-700 text-white rounded-full px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/50 placeholder:text-zinc-600"
                        />
                        <button 
                            onClick={handleSend}
                            disabled={!input.trim() || loading}
                            className="bg-orange-500 text-white p-3 rounded-full hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <Send className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default function App() {
  const [activeTab, setActiveTab] = useState('kunafa');
  const [isAIChatOpen, setIsAIChatOpen] = useState(false);

  // Set body background to ensure no white flash
  useEffect(() => {
    document.body.style.backgroundColor = '#09090b';
    document.body.style.color = 'white';
    return () => {
        document.body.style.backgroundColor = '';
        document.body.style.color = '';
    };
  }, []);

  // Function to handle the "Suggest for me" header button
  const handleSmartSuggestion = async () => {
      setIsAIChatOpen(true);
  };

  return (
    <div className="min-h-screen bg-zinc-950 font-sans relative text-right" dir="rtl">
      <Header onSuggestionClick={handleSmartSuggestion} />
      
      <CategoryTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="container mx-auto px-4 py-6 pb-20">
        <div className="mb-6">
            <h2 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                {MENU_DATA[activeTab].icon}
                {MENU_DATA[activeTab].title}
            </h2>
            <div className="h-1 w-20 bg-orange-500 rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MENU_DATA[activeTab].items.map((item) => (
            <MenuItem key={item.id} item={item} />
          ))}
        </div>
      </main>

      <Footer />

      {/* Floating Action Button for AI */}
      <button 
        onClick={() => setIsAIChatOpen(true)}
        className="fixed bottom-6 left-6 bg-gradient-to-r from-orange-500 to-pink-600 text-white p-4 rounded-full shadow-2xl shadow-orange-500/40 hover:scale-110 transition-transform duration-300 z-40 group"
      >
        <MessageCircle className="w-6 h-6 animate-bounce" />
        <span className="absolute left-full ml-3 top-1/2 -translate-y-1/2 bg-white text-zinc-900 px-3 py-1 rounded-lg text-xs font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg">
            مساعد تايني الذكي ✨
        </span>
      </button>

      {/* AI Chat Modal */}
      <AIChatModal isOpen={isAIChatOpen} onClose={() => setIsAIChatOpen(false)} />
    </div>
  );
}
