const categories = [
  {
    name: "Intelligence and the Mind",
    subcategories: [
      "Speak and write well",
      "Think and mathematical skills",
      "Perform or enjoy arts, music",
      "Move the body in sports",
      "Understand self and others",
      "Recognize patterns",
      "", "", "", ""
    ]
  },
  {
    name: "Adventurer",
    subcategories: [
      "Outdoor travel",
      "Health-minded activities",
      "Activist",
      "Complete",
      "", "", "", "", "", ""
    ]
  },
  {
    name: "Cleanliness",
    subcategories: [
      "Home is kept",
      "Workspace is kept",
      "Personal items have place",
      "", "", "", "", "", "", ""
    ]
  },
  {
    name: "Responsibility",
    subcategories: ["Clear boundaries", "", "", "", "", "", "", "", "", ""]
  },
  {
    name: "Confidence and the Heart",
    subcategories: ["Self-efficacy", "", "", "", "", "", "", "", "", ""]
  },
  {
    name: "Resourceful",
    subcategories: ["Open-minded", "Self-assured", "Imaginative", "", "", "", "", "", "", ""]
  },
  {
    name: "Playful",
    subcategories: ["Other-directed", "", "", "", "", "", "", "", "", ""]
  },
  {
    name: "Courageous",
    subcategories: ["Physical", "Emotional", "", "", "", "", "", "", "", ""]
  },
  {
    name: "Wisdom",
    subcategories: ["Visionary", "", "", "", "", "", "", "", "", ""]
  },
  {
    name: "Beauty",
    subcategories: ["Extravagance", "", "", "", "", "", "", "", "", ""]
  }
];

const App = () => {
  const [grid, setGrid] = React.useState(
    Array(categories.length).fill().map(() => Array(10).fill(0))
  );
  const [theme, setTheme] = React.useState(localStorage.getItem('theme') || 'light');

  React.useEffect(() => {
    document.body.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const totalScores = grid.flat().reduce((sum, val) => sum + val, 0);
  const nonEmptyCells = grid.flat().filter(val => val > 0).length;
  const overallScore = nonEmptyCells > 0 ? (totalScores / nonEmptyCells).toFixed(1) : 0;

  const calculateCategoryBonus = (row) => {
    const nonEmptySubcategories = categories[row].subcategories.filter(sub => sub).length;
    if (nonEmptySubcategories === 0) return false;
    const validScores = grid[row].slice(0, nonEmptySubcategories).every(score => score >= 5);
    return validScores;
  };

  const handleCellClick = (row, col) => {
    const newGrid = grid.map((r, i) =>
      i === row ? r.map((c, j) => (j === col ? (c === 10 ? 0 : c + 1) : c)) : r
    );
    setGrid(newGrid);
  };

  const handleClear = () => {
    setGrid(Array(categories.length).fill().map(() => Array(10).fill(0)));
  };

  const handleDownload = () => {
    const csvData = [
      ["Category", ...Array(10).fill().map((_, i) => `Score ${i + 1}`), "Bonus"],
      ...categories.map((category, row) => [
        category.name,
        ...grid[row],
        calculateCategoryBonus(row) ? "Yes" : "No"
      ])
    ];
    const csv = Papa.unparse(csvData);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "partner_rubric_scores.csv";
    link.click();
  };

  const chartData = categories.map((category, i) => ({
    name: category.name,
    score: grid[i].reduce((sum, val) => sum + val, 0)
  }));

  return (
    <div>
      <nav className="navbar flex justify-center">
        <div className="flex space-x-4">
          <a href="#" className="text-lg">Home</a>
          <a href="#" onClick={handleClear} className="text-lg">Clear Grid</a>
          <a href="#" onClick={handleDownload} className="text-lg">Download CSV</a>
          <a href="#" onClick={toggleTheme} className="text-lg">
            {theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
          </a>
        </div>
      </nav>
      <main className="container mx-auto p-4">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-4">
          Partner Rubric Point System
        </h1>
        <p className="text-center text-lg mb-4">
          Overall Average Score: <span className="font-bold text-green-600">{overallScore}/10</span>
        </p>

        <div className="overflow-x-auto mb-8">
          <div className="grid grid-cols-[200px_repeat(10,80px)] gap-1 min-w-max">
            <div className="bg-blue-500 text-white p-2 font-bold">Category</div>
            {Array(10).fill().map((_, i) => (
              <div key={i} className="bg-blue-500 text-white p-2 text-center font-bold">
                {i + 1}
              </div>
            ))}

            {categories.map((category, row) => (
              <React.Fragment key={row}>
                <div
                  className="bg-blue-100 p-2 font-semibold tooltip flex items-center"
                  data-tooltip={`${category.name} - Bonus: ${
                    calculateCategoryBonus(row) ? "High scores achieved!" : "Needs higher scores"
                  }`}
                >
                  {category.name} {calculateCategoryBonus(row) && <span className="ml-2 text-yellow-500">★</span>}
                </div>
                {grid[row].map((value, col) => (
                  <div
                    key={col}
                    onClick={() => handleCellClick(row, col)}
                    className={`grid-cell p-2 border border-gray-300 cursor-pointer transition-colors tooltip ${
                      value > 0
                        ? `bg-green-100 bg-opacity-${value * 10}`
                        : `bg-[var(--cell-bg)] hover:bg-[var(--cell-hover)]`
                    } flex items-center justify-center text-sm`}
                    data-tooltip={
                      category.subcategories[col]
                        ? `Score ${value} for ${category.subcategories[col]}`
                        : ""
                    }
                  >
                    {value > 0 ? value : ""}
                  </div>
                ))}
              </React.Fragment>
            ))}
          </div>
        </div>

        <div className="bg-[var(--cell-bg)] p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-4">Total Score per Category</h2>
          <Recharts.ResponsiveContainer width="100%" height={400}>
            <Recharts.BarChart data={chartData}>
              <Recharts.CartesianGrid strokeDasharray="3 3" />
              <Recharts.XAxis dataKey="name" style={{ fontSize: 12 }} interval={0} angle={-45} textAnchor="end" height={100} />
              <Recharts.YAxis label={{ value: "Total Score", angle: -90, position: "insideLeft", style: { fontSize: 12 } }} style={{ fontSize: 12 }} />
              <Recharts.Tooltip />
              <Recharts.Legend />
              <Recharts.Bar dataKey="score" fill="#82ca9d" />
            </Recharts.BarChart>
          </Recharts.ResponsiveContainer>
        </div>
      </main>
      <footer className="footer">
        <p>Overall Average Score: <span className="font-bold">{overallScore}/10</span></p>
      </footer>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
