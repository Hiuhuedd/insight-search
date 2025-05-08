export default function HeroSection() {
    return (
      <section className="relative h-[60vh] overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: "url('https://picsum.photos/seed/news/1200/800')" 
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40" />
        
        <div className="relative h-full container mx-auto px-4 flex items-center">
          <div className="max-w-3xl text-white">
            <span className="inline-block px-3 py-1 mb-4 text-sm font-semibold bg-blue-600 rounded-full">
              Breaking News
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4">
              Major developments in global tech innovation
            </h2>
            <p className="text-lg md:text-xl opacity-90 mb-6">
              Explore how AI advancements are reshaping industries worldwide
            </p>
            <div className="flex items-center space-x-4">
              <span className="text-sm">By Jane Smith</span>
              <span className="text-sm opacity-75">•</span>
              <span className="text-sm opacity-75">3 hours ago</span>
            </div>
          </div>
        </div>
      </section>
    )
  }