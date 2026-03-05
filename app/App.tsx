import { useState } from "react";
import MapView from "./components/MapView";
import TrashBinModal from "./components/TrashBinModal";
import RecyclingScanner from "./components/RecyclingScanner";

export interface BinLocation {
  id: string;
  type: "trash" | "recycling";
  x: number; // 百分比位置
  y: number; // 百分比位置
  name: string;
  story?: string;
  isCheckedIn: boolean;
  color: string;
}

export default function App() {
  const [view, setView] = useState<
    "map" | "trash-modal" | "scanner"
  >("map");
  const [selectedBin, setSelectedBin] =
    useState<BinLocation | null>(null);
  const [contributions, setContributions] = useState(0);

  // 模拟地图上的垃圾桶和回收桶位置
  const [bins, setBins] = useState<BinLocation[]>([
    {
      id: "1",
      type: "trash",
      x: 85,
      y: 70,
      name: "教学楼A垃圾桶",
      story:
        "这个垃圾桶见证了无数学生的努力。每天清晨，它迎接第一批早起的同学；深夜，它送走最后一位离开的身影。它默默守护着校园的整洁，是环保的无名英雄。",
      isCheckedIn: false,
      color: "#EF4444",
    },
    {
      id: "2",
      type: "recycling",
      x: 55,
      y: 65,
      name: "图书馆回收桶",
      story: "",
      isCheckedIn: false,
      color: "#3B82F6",
    },
    {
      id: "3",
      type: "trash",
      x: 40,
      y: 20,
      name: "永平书院垃圾桶",
      story:
        "宿舍楼的垃圾桶是同学们日常生活的见证者。从凌晨的外卖盒到深夜的能量饮料罐，它收纳着大学生活的点点滴滴，也提醒我们要养成良好的环保习惯。",
      isCheckedIn: false,
      color: "#F97316",
    },
    {
      id: "4",
      type: "recycling",
      x: 50,
      y: 55,
      name: "食堂回收桶",
      story: "",
      isCheckedIn: false,
      color: "#22C55E",
    },
    {
      id: "5",
      type: "trash",
      x: 10,
      y: 70,
      name: "操场垃圾桶",
      story:
        "操场上的这个垃圾桶陪伴着运动健儿们挥洒汗水。它见证了运动会的激情、课间的欢笑，还有晨跑时的坚持。保持操场清洁，从正确投放垃圾开始。",
      isCheckedIn: false,
      color: "#8B5CF6",
    },
    {
      id: "6",
      type: "recycling",
      x: 30,
      y: 65,
      name: "实验楼回收桶",
      story: "",
      isCheckedIn: false,
      color: "#06B6D4",
    },
    {
      id: "7",
      type: "trash",
      x: 60,
      y: 75,
      name: "艺术中心垃圾桶",
      story:
        "艺术中心的垃圾桶充满了创意的气息。废弃的画纸、用尽的颜料管、折断的画笔，每一样都曾是艺术创作的一部分。垃圾分类，也是一门艺术。",
      isCheckedIn: false,
      color: "#EC4899",
    },
    {
      id: "8",
      type: "recycling",
      x: 13,
      y: 73,
      name: "体育馆回收桶",
      story: "",
      isCheckedIn: false,
      color: "#10B981",
    },
    {
      id: "9",
      type: "trash",
      x: 25,
      y: 35,
      name: "道扬书院垃圾桶",
      story:
        "宿舍楼B区的垃圾桶，同样见证着同学们的日常生活。它提醒着我们，环保从身边的小事做起，从正确分类每一件垃圾开始。",
      isCheckedIn: false,
      color: "#F59E0B",
    },
    {
      id: "9",
      type: "trash",
      x: 45,
      y: 28,
      name: "学勤书院垃圾桶",
      story:
        "宿舍楼B区的垃圾桶，同样见证着同学们的日常生活。它提醒着我们，环保从身边的小事做起，从正确分类每一件垃圾开始。",
      isCheckedIn: false,
      color: "#F59E0B",
    },
  ]);

  const handleBinClick = (bin: BinLocation) => {
    setSelectedBin(bin);
    if (bin.type === "trash") {
      setView("trash-modal");
    } else {
      setView("scanner");
    }
  };

  const handleCheckIn = () => {
    if (selectedBin) {
      setBins(
        bins.map((bin) =>
          bin.id === selectedBin.id
            ? { ...bin, isCheckedIn: true }
            : bin,
        ),
      );
      setContributions((prev) => prev + 10);
    }
  };

  const handleBackToMap = () => {
    setView("map");
    setSelectedBin(null);
  };

  return (
    <div className="w-full h-screen bg-slate-50">
      {view === "map" && (
        <MapView bins={bins} onBinClick={handleBinClick} />
      )}

      {view === "trash-modal" && selectedBin && (
        <TrashBinModal
          bin={selectedBin}
          onCheckIn={handleCheckIn}
          onClose={handleBackToMap}
        />
      )}

      {view === "scanner" && selectedBin && (
        <RecyclingScanner
          bin={selectedBin}
          contributions={contributions}
          onCheckIn={handleCheckIn}
          onClose={handleBackToMap}
        />
      )}
    </div>
  );
}