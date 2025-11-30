// src/components/Workbooks.tsx
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { FileText, Download } from "lucide-react";

/**
 * Replace `file` values with your real PDF URLs or local public paths:
 * e.g. "/workbooks/math-ch1.pdf" if you put PDFs in public/workbooks/
 */
const initialWorkbooks = [
  {
    id: "wb1",
    title: "Mathematics Workbook - Chapter 1",
    description: "Basic algebra practice problems and worked examples.",
    file: "https://example.com/sample-math-workbook.pdf",
    tags: ["Math", "Algebra"],
  },
  {
    id: "wb2",
    title: "Physics Practice Exercises",
    description: "Mechanics exercises with solutions.",
    file: "https://example.com/sample-physics-workbook.pdf",
    tags: ["Physics", "Mechanics"],
  },
  {
    id: "wb3",
    title: "English Grammar Exercises",
    description: "Practice for tenses and sentence construction.",
    file: "https://example.com/sample-english-workbook.pdf",
    tags: ["English", "Grammar"],
  },
];

export default function Workbooks() {
  const [query, setQuery] = useState("");
  const [workbooks] = useState(initialWorkbooks);

  const filtered = workbooks.filter((w) => {
    const q = query.trim().toLowerCase();
    if (!q) return true;
    return (
      w.title.toLowerCase().includes(q) ||
      w.description.toLowerCase().includes(q) ||
      w.tags.join(" ").toLowerCase().includes(q)
    );
  });

  return (
    <div className="p-6">
      <Card style={{ marginBottom: 18 }}>
        <CardHeader>
          <CardTitle className="text-2xl">Workbooks</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            Digital workbooks and practice exercises. Use the search to quickly find a workbook.
          </p>

          <div style={{ maxWidth: 560 }}>
            <Input
              placeholder="Search by title, description or tag..."
              value={query}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)}
              className="mb-4"
            />
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.length === 0 && (
          <div className="text-muted-foreground p-4">No workbooks found for "{query}".</div>
        )}

        {filtered.map((wb) => (
          <Card key={wb.id} className="hover:shadow-md">
            <CardContent>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: 10,
                    background: "linear-gradient(180deg,#f3e8ff,#e7d8ff)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <FileText className="w-6 h-6 text-purple-600" />
                </div>

                <div style={{ flex: 1 }}>
                  <h3 style={{ margin: 0, fontSize: 16, fontWeight: 600 }}>{wb.title}</h3>
                  <p style={{ margin: "6px 0 0 0", color: "#6b7280", fontSize: 13 }}>
                    {wb.description}
                  </p>

                  <div style={{ marginTop: 8, display: "flex", gap: 8 }}>
                    {wb.tags.map((t) => (
                      <span
                        key={t}
                        style={{
                          background: "rgba(167,139,250,0.12)",
                          padding: "4px 8px",
                          borderRadius: 6,
                          fontSize: 12,
                          color: "#5b21b6",
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div style={{ marginTop: 14, display: "flex", gap: 8, justifyContent: "flex-end" }}>
                <Button
                  size="sm"
                  onClick={() => {
                    // open workbook in new tab (replaceable with internal viewer)
                    window.open(wb.file, "_blank");
                  }}
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
