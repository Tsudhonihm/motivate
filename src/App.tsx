import React, { useState, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { motion, AnimatePresence } from 'framer-motion';
import { quotes } from './quotes';

function getRandomQuote() {
  return quotes[Math.floor(Math.random() * quotes.length)];
}

function App() {
  const [quote, setQuote] = useState(getRandomQuote);

  const triggerConfetti = useCallback(() => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  }, []);

  const generateNewQuote = useCallback(() => {
    triggerConfetti();
    setQuote(getRandomQuote());
  }, [triggerConfetti]);

  const shareQuote = useCallback(async () => {
    const shareData = {
      title: 'Daily Inspiration',
      text: `"${quote.text}" - ${quote.author}`,
      url: window.location.href
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        // Fallback for desktop browsers
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareData.text)}&url=${encodeURIComponent(shareData.url)}`, '_blank');
      }
    } catch (err) {
      console.error('Error sharing:', err);
    }
  }, [quote]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-purple-500 to-pink-500 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <motion.div
          className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-xl border border-white/20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center justify-center mb-8">
            <Sparkles className="w-8 h-8 text-white mr-3" />
            <h1 className="text-3xl font-bold text-white">Daily Inspiration</h1>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={quote.text}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center mb-8"
            >
              <p className="text-2xl text-white mb-4 italic">"{quote.text}"</p>
              <p className="text-lg text-white/80">- {quote.author}</p>
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-purple-600 px-6 py-3 rounded-lg flex items-center transition-colors duration-200 font-semibold hover:bg-white/90"
              onClick={generateNewQuote}
            >
              <RefreshCw className="w-5 h-5 mr-2" />
              New Quote
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-purple-600 px-6 py-3 rounded-lg flex items-center transition-colors duration-200 font-semibold hover:bg-white/90"
              onClick={shareQuote}
            >
              <Share2 className="w-5 h-5 mr-2" />
              Share
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default App;
