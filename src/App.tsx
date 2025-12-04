import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, Gift, Dog, X } from 'lucide-react'
import confetti from 'canvas-confetti'

// Тип для наших воспоминаний
type Memory = {
  id: number;
  type: 'text' | 'image' | 'coupon';
  content: string;
  bgColor: string;
}

// Заглушки данных (потом заменим на твои)
const memories: Memory[] = [
  { id: 1, type: 'text', content: 'Ты — лучший папа для нашего пёселя! 🐶', bgColor: 'bg-blue-100' },
  { id: 2, type: 'coupon', content: '🎟 Купон на массаж спины (бессрочный)', bgColor: 'bg-purple-100' },
  { id: 3, type: 'text', content: 'Помнишь, как мы заблудились в лесу? Было страшно, но весело!', bgColor: 'bg-green-100' },
  { id: 4, type: 'text', content: 'Люблю, когда ты улыбаешься ❤️', bgColor: 'bg-pink-100' },
  { id: 5, type: 'coupon', content: '🎟 Освобождение от мытья посуды', bgColor: 'bg-orange-100' },
]

function App() {
  const [currentMemory, setCurrentMemory] = useState<Memory | null>(null)

  const generateMemory = () => {
    // Эффект конфетти при нажатии
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
    
    const random = memories[Math.floor(Math.random() * memories.length)]
    setCurrentMemory(random)
  }

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 to-slate-200 p-4 relative overflow-hidden">
      
      {/* Заголовок */}
      <div className="absolute top-10 text-center z-10">
        <h1 className="text-3xl font-bold text-slate-800 mb-2">Генератор Настроения</h1>
        <p className="text-slate-500">Для любимого мужа</p>
      </div>

      {/* Основная область контента */}
      <div className="relative w-full max-w-md aspect-[3/4] flex items-center justify-center">
        <AnimatePresence mode='wait'>
          {!currentMemory ? (
            <motion.div 
              key="start"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="text-center p-8 rounded-3xl bg-white shadow-xl border border-slate-100"
            >
              <Dog size={64} className="mx-auto text-primary mb-4" />
              <p className="text-lg text-slate-600">Нажми на кнопку, чтобы получить дозу любви!</p>
            </motion.div>
          ) : (
            <motion.div
              key={currentMemory.id}
              initial={{ y: 50, opacity: 0, rotate: -5 }}
              animate={{ y: 0, opacity: 1, rotate: 0 }}
              exit={{ y: -50, opacity: 0, rotate: 5 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              className={`w-full h-full ${currentMemory.bgColor} rounded-3xl shadow-2xl p-8 flex flex-col items-center justify-center text-center border-4 border-white relative`}
            >
              {/* Кнопка закрыть */}
              <button 
                onClick={() => setCurrentMemory(null)}
                className="absolute top-4 right-4 p-2 bg-white/50 rounded-full hover:bg-white/80 transition-colors"
              >
                <X size={20} />
              </button>

              {currentMemory.type === 'coupon' && <Gift size={48} className="text-purple-500 mb-4" />}
              {currentMemory.type === 'text' && <Heart size={48} className="text-red-500 mb-4" />}
              
              <h2 className="text-2xl font-bold text-slate-800 leading-relaxed">
                {currentMemory.content}
              </h2>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Кнопка действия */}
      <div className="absolute bottom-10 w-full px-4 max-w-md z-20">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={generateMemory}
          className="w-full py-4 bg-black text-white rounded-2xl text-xl font-semibold shadow-lg flex items-center justify-center gap-2"
        >
          <Heart className="fill-current" size={24} />
          Хочу сюрприз!
        </motion.button>
      </div>

    </div>
  )
}

export default App


