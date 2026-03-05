import { motion } from 'motion/react';
import { X, Upload, Camera, TrendingUp, Award, Leaf } from 'lucide-react';
import { Button } from './ui/button';
import type { BinLocation } from '../App';
import { useState } from 'react';

interface RecyclingScannerProps {
  bin: BinLocation;
  contributions: number;
  onCheckIn: () => void;
  onClose: () => void;
}

export default function RecyclingScanner({ bin, contributions, onCheckIn, onClose }: RecyclingScannerProps) {
  const [scanning, setScanning] = useState(false);
  const [scanned, setScanned] = useState(false);
  const [uploading, setUploading] = useState(false);

  const handleScan = () => {
    setScanning(true);
    // 模拟扫描过程
    setTimeout(() => {
      setScanning(false);
      setScanned(true);
      onCheckIn();
    }, 2000);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploading(true);
      setTimeout(() => {
        setUploading(false);
        setScanned(true);
        onCheckIn();
      }, 1500);
    }
  };

  return (
    <div className="relative w-full h-full bg-gradient-to-b from-slate-700 to-slate-900 overflow-hidden">
      {/* 关闭按钮 */}
      <button
        onClick={onClose}
        className="absolute top-6 left-6 z-50 w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors"
      >
        <X className="w-6 h-6 text-white" />
      </button>

      {/* 标题 */}
      <div className="absolute top-6 left-0 right-0 text-center z-40">
        <motion.h1
          className="text-white text-xl font-medium"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          Align the cylinder in the dashed frame.
        </motion.h1>
      </div>

      {/* 扫描区域 */}
      <div className="absolute inset-0 flex items-start justify-center pt-24 pb-96">
        <div className="relative w-full max-w-2xl aspect-[3/4] mx-auto">
          {/* 摄像头背景 - 使用提供的图片样式 */}
          <div className="absolute inset-0 bg-gray-400/30 backdrop-blur-sm rounded-3xl overflow-hidden">
            {/* 模拟摄像头画面 */}
            <motion.div
              className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400"
              animate={{
                opacity: scanning ? [1, 0.7, 1] : 1
              }}
              transition={{
                duration: 0.5,
                repeat: scanning ? Infinity : 0
              }}
            />
          </div>

          {/* 扫描框 - 量筒形状 */}
          <div className="absolute top-[35%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[45%] h-[50%]">
            {/* 量筒形状的虚线框 */}
            <motion.div
              className="absolute inset-0"
              animate={{
                opacity: scanning ? [1, 0.7, 1] : 1,
                scale: scanning ? [1, 1.01, 1] : 1
              }}
              transition={{
                duration: 1.5,
                repeat: scanning ? Infinity : 0
              }}
            >
              <svg 
                className="w-full h-full" 
                viewBox="0 0 200 400" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* 量筒外轮廓 - 虚线 */}
                <path
                  d="M 60 20 L 60 360 L 50 380 L 150 380 L 140 360 L 140 20 Z"
                  stroke="white"
                  strokeWidth="3"
                  strokeDasharray="8 6"
                  fill="none"
                  opacity="0.6"
                />
                
                {/* 量筒顶部开口 */}
                <ellipse
                  cx="100"
                  cy="20"
                  rx="40"
                  ry="8"
                  stroke="white"
                  strokeWidth="3"
                  strokeDasharray="8 6"
                  fill="none"
                  opacity="0.6"
                />
                
                {/* 量筒底部 */}
                <ellipse
                  cx="100"
                  cy="380"
                  rx="50"
                  ry="10"
                  stroke="white"
                  strokeWidth="3"
                  strokeDasharray="8 6"
                  fill="none"
                  opacity="0.6"
                />
                
                {/* 刻度线装饰 */}
                <line x1="60" y1="100" x2="50" y2="100" stroke="cyan" strokeWidth="2" opacity="0.5" />
                <line x1="60" y1="150" x2="50" y2="150" stroke="cyan" strokeWidth="2" opacity="0.5" />
                <line x1="60" y1="200" x2="50" y2="200" stroke="cyan" strokeWidth="2" opacity="0.5" />
                <line x1="60" y1="250" x2="50" y2="250" stroke="cyan" strokeWidth="2" opacity="0.5" />
                <line x1="60" y1="300" x2="50" y2="300" stroke="cyan" strokeWidth="2" opacity="0.5" />
                
                <line x1="140" y1="100" x2="150" y2="100" stroke="cyan" strokeWidth="2" opacity="0.5" />
                <line x1="140" y1="150" x2="150" y2="150" stroke="cyan" strokeWidth="2" opacity="0.5" />
                <line x1="140" y1="200" x2="150" y2="200" stroke="cyan" strokeWidth="2" opacity="0.5" />
                <line x1="140" y1="250" x2="150" y2="250" stroke="cyan" strokeWidth="2" opacity="0.5" />
                <line x1="140" y1="300" x2="150" y2="300" stroke="cyan" strokeWidth="2" opacity="0.5" />
              </svg>
            </motion.div>

            {/* 扫描线动画 */}
            {scanning && (
              <motion.div
                className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-lg shadow-cyan-400/50"
                initial={{ top: '0%' }}
                animate={{ top: '100%' }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
            )}

            {/* 成功提示 */}
            {scanned && (
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
              >
                <div className="bg-green-500 rounded-full p-6">
                  <Award className="w-16 h-16 text-white" />
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* 底部控制区 */}
      <div className="absolute bottom-0 left-0 right-0 p-6 space-y-4 z-40">
        {/* 环保贡献统计 */}
        {!scanned && (
          <motion.div
            className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-xl"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                  <Leaf className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">环保贡献值</p>
                  <p className="text-2xl font-bold text-green-600">{contributions} 分</p>
                </div>
              </div>
              <TrendingUp className="w-8 h-8 text-green-500" />
            </div>
            
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="bg-blue-50 rounded-xl p-3">
                <p className="text-xs text-gray-600 mb-1">今日打卡</p>
                <p className="text-lg font-bold text-blue-600">3</p>
              </div>
              <div className="bg-purple-50 rounded-xl p-3">
                <p className="text-xs text-gray-600 mb-1">本周打卡</p>
                <p className="text-lg font-bold text-purple-600">12</p>
              </div>
              <div className="bg-orange-50 rounded-xl p-3">
                <p className="text-xs text-gray-600 mb-1">总打卡</p>
                <p className="text-lg font-bold text-orange-600">45</p>
              </div>
            </div>
          </motion.div>
        )}

        {/* 成功提示 */}
        {scanned && (
          <motion.div
            className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-xl text-center"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            <Award className="w-16 h-16 mx-auto mb-3 text-green-500" />
            <h3 className="text-xl font-bold text-gray-800 mb-2">扫描成功！</h3>
            <p className="text-gray-600 mb-3">+10 环保贡献值</p>
            <div className="flex items-center justify-center gap-2 text-green-600">
              <Leaf className="w-5 h-5" />
              <span className="text-sm font-medium">为地球节约了一份资源</span>
            </div>
          </motion.div>
        )}

        {/* 操作按钮 */}
        {!scanned && (
          <div className="grid grid-cols-2 gap-4">
            <Button
              className="h-14 text-base font-medium bg-cyan-500 hover:bg-cyan-600"
              onClick={handleScan}
              disabled={scanning || uploading}
            >
              <Camera className="w-5 h-5 mr-2" />
              {scanning ? '扫描中...' : '开始扫描'}
            </Button>

            <div className="relative">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
                id="upload-recycling"
                disabled={scanning || uploading}
              />
              <Button
                className="w-full h-14 text-base font-medium bg-white hover:bg-gray-100 text-gray-800"
                onClick={() => document.getElementById('upload-recycling')?.click()}
                disabled={scanning || uploading}
              >
                <Upload className="w-5 h-5 mr-2" />
                {uploading ? '上传中...' : 'Upload Photo'}
              </Button>
            </div>
          </div>
        )}

        {scanned && (
          <Button
            className="w-full h-14 text-base font-medium bg-green-500 hover:bg-green-600"
            onClick={onClose}
          >
            返回地图
          </Button>
        )}
      </div>
    </div>
  );
}
