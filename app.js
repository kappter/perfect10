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
      "Growth Potential",
      "Consistency",
      "Adaptability",
      "Future Vision"
    ]
  },
  {
    name: "Adventurer",
    subcategories: [
      "Outdoor travel",
      "Health-minded activities",
      "Activist",
      "Complete",
      "Exploration Drive",
      "Risk-Taking",
      "Growth Potential",
      "Consistency",
      "Adaptability",
      "Future Vision"
    ]
  },
  {
    name: "Cleanliness",
    subcategories: [
      "Home is kept",
      "Workspace is kept",
      "Personal items have place",
      "Organizational Habits",
      "Attention to Detail",
      "Systematic Approach",
      "Growth Potential",
      "Consistency",
      "Adaptability",
      "Future Vision"
    ]
  },
  {
    name: "Responsibility",
    subcategories: [
      "Clear boundaries",
      "Duty Fulfillment",
      "Reliability",
      "Accountability",
      "Commitment",
      "Ethical Conduct",
      "Growth Potential",
      "Consistency",
      "Adaptability",
      "Future Vision"
    ]
  },
  {
    name: "Confidence and the Heart",
    subcategories: [
      "Self-efficacy",
      "Emotional Resilience",
      "Self-Belief",
      "Optimism",
      "Inner Strength",
      "Empathy",
      "Growth Potential",
      "Consistency",
      "Adaptability",
      "Future Vision"
    ]
  },
  {
    name: "Resourceful",
    subcategories: [
      "Open-minded",
      "Self-assured",
      "Imaginative",
      "Problem-Solving",
      "Innovative Thinking",
      "Flexibility",
      "Growth Potential",
      "Consistency",
      "Adaptability",
      "Future Vision"
    ]
  },
  {
    name: "Playful",
    subcategories: [
      "Other-directed",
      "Spontaneity",
      "Humor",
      "Joyfulness",
      "Creativity in Fun",
      "Social Engagement",
      "Growth Potential",
      "Consistency",
      "Adaptability",
      "Future Vision"
    ]
  },
  {
    name: "Courageous",
    subcategories: [
      "Physical",
      "Emotional",
      "Moral Bravery",
      "Risk Tolerance",
      "Standing Firm",
      "Overcoming Fear",
      "Growth Potential",
      "Consistency",
      "Adaptability",
      "Future Vision"
    ]
  },
  {
    name: "Wisdom",
    subcategories: [
      "Visionary",
      "Insightful Judgment",
      "Life Experience",
      "Perspective",
      "Prudence",
      "Mentorship",
      "Growth Potential",
      "Consistency",
      "Adaptability",
      "Future Vision"
    ]
  },
  {
    name: "Beauty",
    subcategories: [
      "Extravagance",
      "Aesthetic Appreciation",
      "Grace",
      "Charm",
      "Elegance",
      "Cultural Expression",
      "Growth Potential",
      "Consistency",
      "Adaptability",
      "Future Vision"
    ]
  }
];

const App = () => {
  const [grid, setGrid] = React.useState(
    Array(categories.length).fill().map(() => Array(10).fill(0))
  );
  const [theme, setTheme] = React.useState(localStorage.getItem('theme') || 'light');
  const [activeCell, setActiveCell] = React.useState(null);

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
    setActiveCell({ row, col });
  };

  const handleInputChange = (row, col, value) => {
    const numValue = parseInt(value, 10);
    if (!isNaN(numValue) && numValue >= 0 && numValue <= 10) {
      const newGrid = grid.map((r, i) =>
        i === row ? r.map((c, j) => (j === col ? numValue : c)) : r
      );
      setGrid(newGrid);
    }
    setActiveCell(null);
  };

  const handleInputBlur = () => {
    setActiveCell(null);
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
                    className={`grid-cell p-2 border border-gray-300 cursor-pointer transition-colors tooltip relative ${
                      value > 0
                        ? `bg-green-100 bg-opacity-${value * 10}`
                        : `bg-[var(--cell-bg)] hover:bg-[var(--cell-hover)]`
                    } flex items-center justify-center text-sm`}
                    data-tooltip={`Score ${value} for ${category.subcategories[col]}`}
                  >
                    {activeCell && activeCell.row === row && activeCell.col === col ? (
                      <input
                        type="number"
                        min="0"
                        max="10"
                        defaultValue={value}
                        onChange={(e) => handleInputChange(row, col, e.target.value)}
                        onBlur={handleInputBlur}
                        className="w-full h-full text-center bg-transparent border-none outline-none"
                        autoFocus
                      />
                    ) : (
                      value > 0 ? value : ""
                    )}
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
        <p className="copyright">© 2025 All Rights Reserved</p>
      </footer>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
