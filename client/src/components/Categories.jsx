function Categories() {
  const categories = [
    {
      name: "Java",
      icon: "☕",
      description: "Test your Java programming skills",
    },
    {
      name: "Python",
      icon: "🐍",
      description: "Practice Python concepts and coding",
    },
    {
      name: "Web Development",
      icon: "🌐",
      description: "HTML, CSS, JavaScript and React",
    },
    {
      name: "DBMS",
      icon: "🗄️",
      description: "Database concepts and SQL",
    },
    {
      name: "Operating Systems",
      icon: "💻",
      description: "OS concepts and fundamentals",
    },
    {
      name: "Aptitude",
      icon: "🧠",
      description: "Improve your logical and quantitative skills",
    },
  ];

  return (
    <section className="bg-slate-50 py-16">
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-12">
          <p className="text-blue-600 font-semibold">
            Explore
          </p>

          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-2">
            Quiz Categories
          </h2>

          <p className="text-slate-500 mt-3">
            Choose a category and start improving your skills.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <div
              key={category.name}
              className="bg-white p-6 rounded-2xl border border-slate-200
                         hover:-translate-y-1 hover:shadow-xl
                         transition duration-300 cursor-pointer"
            >
              <div className="text-4xl mb-4">
                {category.icon}
              </div>

              <h3 className="text-xl font-bold text-slate-900">
                {category.name}
              </h3>

              <p className="text-slate-500 mt-2">
                {category.description}
              </p>

              <button className="text-blue-600 font-semibold mt-4 hover:text-blue-800">
                Start Quiz →
              </button>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default Categories;