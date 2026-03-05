import { motion } from 'motion/react';
import { X, Camera, CheckCircle } from 'lucide-react';
import { Button } from './ui/button';
import type { BinLocation } from '../App';
import { useState } from 'react';

interface TrashBinModalProps {
  bin: BinLocation;
  onCheckIn: () => void;
  onClose: () => void;
}

export default function TrashBinModal({ bin, onCheckIn, onClose }: TrashBinModalProps) {
  const [uploading, setUploading] = useState(false);
  const [uploaded, setUploaded] = useState(false);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploading(true);
      // 模拟上传过程
      setTimeout(() => {
        setUploading(false);
        setUploaded(true);
        setTimeout(() => {
          onCheckIn();
        }, 500);
      }, 1500);
    }
  };

  return (
    <motion.div
      className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="bg-white rounded-3xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
        initial={{ scale: 0.9, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 50 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* 头部 */}
        <div 
          className="relative p-6 rounded-t-3xl"
          style={{ backgroundColor: `${bin.color}15` }}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/80 flex items-center justify-center hover:bg-white transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
          
          <div className="flex items-center gap-4 mb-4">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center shadow-lg"
              style={{ backgroundColor: bin.color }}
            >
              <Camera className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">{bin.name}</h2>
              <p className="text-sm text-gray-600">分享你的环保瞬间</p>
            </div>
          </div>

          {bin.isCheckedIn && (
            <motion.div
              className="flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full w-fit"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
            >
              <CheckCircle className="w-4 h-4" />
              <span className="text-sm font-medium">已打卡</span>
            </motion.div>
          )}
        </div>

        {/* 内容 */}
        <div className="p-6">
          {/* 故事 */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <span className="w-1 h-5 rounded-full" style={{ backgroundColor: bin.color }}></span>
              垃圾桶的故事
            </h3>
            <p className="text-gray-700 leading-relaxed">
              {bin.story || '这个垃圾桶默默守护着校园的整洁，是环保的无名英雄。'}
            </p>
          </div>

          {/* 拍照上传区域 */}
          {!bin.isCheckedIn && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                <span className="w-1 h-5 rounded-full" style={{ backgroundColor: bin.color }}></span>
                拍照打卡
              </h3>
              
              <input
                type="file"
                accept="image/*"
                capture="environment"
                onChange={handleFileUpload}
                className="hidden"
                id="photo-upload"
                disabled={uploading || uploaded}
              />
              
              <label
                htmlFor="photo-upload"
                className="block border-2 border-dashed rounded-2xl p-8 text-center transition-colors hover:border-gray-400 cursor-pointer"
                style={{ borderColor: `${bin.color}40` }}
              >
                {uploading ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  >
                    <Camera className="w-16 h-16 mx-auto mb-4" style={{ color: bin.color }} />
                  </motion.div>
                ) : uploaded ? (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                  >
                    <CheckCircle className="w-16 h-16 mx-auto mb-4 text-green-500" />
                  </motion.div>
                ) : (
                  <Camera className="w-16 h-16 mx-auto mb-4" style={{ color: bin.color }} />
                )}
                <p className="text-lg font-medium text-gray-800 mb-2">
                  {uploading ? '上传中...' : uploaded ? '上传成功！' : '点击拍照或上传照片'}
                </p>
                <p className="text-sm text-gray-500">
                  {uploading ? '请稍候' : uploaded ? '打卡完成，点亮地图' : '记录你的环保行动'}
                </p>
              </label>
            </div>
          )}

          {bin.isCheckedIn && (
            <motion.div
              className="text-center py-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <CheckCircle className="w-20 h-20 mx-auto mb-4 text-green-500" />
              <h3 className="text-xl font-bold text-gray-800 mb-2">打卡成功！</h3>
              <p className="text-gray-600">
                感谢你为环保做出的贡献
              </p>
            </motion.div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
