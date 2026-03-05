import { motion } from 'motion/react';
import { Trash2, Beaker } from 'lucide-react';
import type { BinLocation } from '../App';
import mapImage from 'figma:asset/b078719e9cd78e4a5dbd3c9c422ab67cf4640673.png';

interface MapViewProps {
  bins: BinLocation[];
  onBinClick: (bin: BinLocation) => void;
}

export default function MapView({ bins, onBinClick }: MapViewProps) {
  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* 地图背景 */}
      <div className="absolute inset-0">
        <img 
          src={mapImage} 
          alt="校园地图" 
          className="w-full h-full object-cover"
        />
      </div>

      {/* 垃圾桶和回收桶标记 */}
      {bins.map((bin) => (
        <motion.button
          key={bin.id}
          className="absolute -translate-x-1/2 -translate-y-1/2 focus:outline-none"
          style={{
            left: `${bin.x}%`,
            top: `${bin.y}%`,
          }}
          onClick={() => onBinClick(bin)}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ 
            scale: 1, 
            opacity: 1,
            filter: bin.isCheckedIn ? 'brightness(1.5) drop-shadow(0 0 8px rgba(255,255,255,0.8))' : 'brightness(1)'
          }}
          transition={{ 
            delay: 0.1 * bins.indexOf(bin),
            duration: 0.5,
            type: "spring"
          }}
        >
          {/* 打卡后的光晕效果 */}
          {bin.isCheckedIn && (
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{
                background: `radial-gradient(circle, ${bin.color}40 0%, transparent 70%)`,
                width: '120px',
                height: '120px',
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)',
              }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.6, 0.3, 0.6],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          )}
          
          {/* 图标容器 */}
          <div
            className="relative rounded-full p-3 shadow-lg transition-all duration-300"
            style={{
              backgroundColor: bin.isCheckedIn ? bin.color : `${bin.color}dd`,
              border: bin.isCheckedIn ? '3px solid white' : '2px solid rgba(255,255,255,0.5)',
            }}
          >
            {bin.type === 'trash' ? (
              <Trash2 className="w-6 h-6 text-white" />
            ) : (
              <Beaker className="w-6 h-6 text-white" />
            )}
          </div>

          {/* 名称标签 */}
          <div 
            className="absolute top-full mt-2 left-1/2 -translate-x-1/2 whitespace-nowrap bg-white/90 px-2 py-1 rounded text-xs shadow-md"
            style={{
              color: bin.color
            }}
          >
            {bin.name}
          </div>

          {/* 已打卡标记 */}
          {bin.isCheckedIn && (
            <motion.div
              className="absolute -top-1 -right-1 bg-yellow-400 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs shadow-md"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
            >
              ✓
            </motion.div>
          )}
        </motion.button>
      ))}

      {/* 统计信息 */}
      <motion.div
        className="absolute bottom-6 right-6 bg-white/95 rounded-2xl shadow-xl p-4 min-w-[200px]"
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-600">已打卡</span>
          <span className="text-2xl font-bold text-green-600">
            {bins.filter(b => b.isCheckedIn).length}/{bins.length}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-green-400 to-green-600"
            initial={{ width: 0 }}
            animate={{ 
              width: `${(bins.filter(b => b.isCheckedIn).length / bins.length) * 100}%` 
            }}
            transition={{ duration: 0.8, delay: 0.6 }}
          />
        </div>
      </motion.div>

      {/* 图例 */}
      <motion.div
        className="absolute bottom-6 left-6 bg-white/95 rounded-2xl shadow-xl p-4"
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center">
              <Trash2 className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm text-gray-700">垃圾桶故事</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
              <Beaker className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm text-gray-700">回收桶扫描</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
