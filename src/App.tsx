import CategoryPills from "./components/CategoryPills";
import { PageHeader } from "./layout/PageHeader";
import { categories, videos } from "./data/home";
import { useState } from "react";
import VideoGridItem from "./components/VideoGridItem";
import SideBar from "./layout/SideBar";

const App = () => {
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);

  return (
    <div className="max-h-screen flex flex-col">
      <PageHeader />
      <div className="grid grid-cols-[auto,1fr] flex-grow overflow-auto">
        <SideBar/>
        <div className="overflow-x-hidden px-8 pb-4">
          <div className="sticky top-0 bg-white z-10 pb-4">
            <CategoryPills
              selectedCategory={selectedCategory}
              categories={categories}
              onSelect={setSelectedCategory}
            />
          </div>
          <div className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(300px,1fr))]">
            {
              videos.map(video => (
                <VideoGridItem key={video.id} {...video} />
              ))
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
