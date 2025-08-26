import React from "react";

const Fitness = () => {
  // Data mẫu (có thumbnail + videoUrl)
  const sampleClips = [
    {
      id: 1,
      title: "Bài tập tay với tạ",
      description: "20 phút tập tay tăng cơ với tạ đơn.",
      videoUrl: "https://www.youtube.com/watch?v=ZGWurjbGhko",
      thumbnail: "https://img.youtube.com/vi/ZGWurjbGhko/0.jpg",
      level: "Trung bình",
      duration: "20 phút",
    },
    {
      id: 2,
      title: "Bài tập bụng 10 phút",
      description: "Đốt mỡ bụng hiệu quả vào buổi sáng.",
      videoUrl: "https://www.youtube.com/watch?v=pLOk5WE7bUQ",
      thumbnail: "https://img.youtube.com/vi/pLOk5WE7bUQ/0.jpg",
      level: "Dễ",
      duration: "10 phút",
    },
    {
      id: 3,
      title: "Tập luyện toàn thân tại nhà",
      description: "30 phút cardio + bodyweight không cần dụng cụ.",
      videoUrl: "https://www.youtube.com/watch?v=HIjU86EYFBw",
      thumbnail: "https://img.youtube.com/vi/HIjU86EYFBw/0.jpg",
      level: "Trung bình",
      duration: "30 phút",
    },
    {
      id: 4,
      title: "HIIT giảm mỡ",
      description: "Bài tập HIIT 15 phút đốt calo nhanh.",
      videoUrl: "https://www.youtube.com/watch?v=ml6cT4AZdqI",
      thumbnail: "https://img.youtube.com/vi/ml6cT4AZdqI/0.jpg",
      level: "Khó",
      duration: "15 phút",
    },
    {
      id: 5,
      title: "Yoga thư giãn buổi sáng",
      description: "Yoga nhẹ nhàng giúp giảm stress và tăng sự dẻo dai.",
      videoUrl: "https://www.youtube.com/watch?v=v7AYKMP6rOE",
      thumbnail: "https://img.youtube.com/vi/v7AYKMP6rOE/0.jpg",
      level: "Dễ",
      duration: "25 phút",
    },
    {
      id: 6,
      title: "Bài tập chân & mông",
      description: "Squat, lunge và nhiều động tác cho chân săn chắc.",
      videoUrl: "https://www.youtube.com/watch?v=aclHkVaku9U",
      thumbnail: "https://img.youtube.com/vi/aclHkVaku9U/0.jpg",
      level: "Trung bình",
      duration: "20 phút",
    },
  ];

  return (
    <div className="p-6 bg-white text-black rounded-lg w-full">
      <h2 className="text-3xl font-bold mb-6 text-center">🏋️ Workout Guide</h2>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sampleClips.map((clip) => (
          <div
            key={clip.id}
            className="bg-slate-50 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition transform hover:-translate-y-1"
          >
            {/* Thumbnail */}
            <img
              src={clip.thumbnail}
              alt={clip.title}
              className="w-full h-48 object-cover"
            />

            {/* Info */}
            <div className="p-4 flex flex-col gap-2">
              <h3 className="font-bold text-lg">{clip.title}</h3>
              <p className="text-sm text-gray-600">{clip.description}</p>

              <div className="flex justify-between text-sm text-gray-500 mt-2">
                <span>⏱ {clip.duration}</span>
                <span>🔥 {clip.level}</span>
              </div>

              <a
                href={clip.videoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 text-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
              >
                ▶ Xem video
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Fitness;
