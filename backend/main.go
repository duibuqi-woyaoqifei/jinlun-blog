package main

import (
	"encoding/json"
	"log"
	"net/http"
	"os"
)

type AppInfo struct {
	Name        string   `json:"name"`
	Version     string   `json:"version"`
	Description string   `json:"description"`
	Features    []string `json:"features"`
}

var apps = []AppInfo{
	{
		Name:        "RBook",
		Version:     "2.1.0",
		Description: "Premium E-Book Reader",
		Features:    []string{"EPUB Support", "Dark Mode", "Sync"},
	},
	{
		Name:        "Unzip Pro",
		Version:     "1.5.4",
		Description: "Powerful Archive Manager",
		Features:    []string{"7z Support", "AES-256 Encryption"},
	},
}

func main() {
	// Check for sync flag (used in GitHub Actions)
	if len(os.Args) > 1 && (os.Args[1] == "--sync" || os.Args[1] == "--sync-only") {
		log.Println("Syncing data to static files...")
		data, _ := json.MarshalIndent(apps, "", "  ")
		err := os.WriteFile("../public/api/v1/apps.json", data, 0644)
		if err != nil {
			log.Fatalf("Failed to write sync file: %v", err)
		}
		log.Println("Sync complete.")
		return
	}

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	http.HandleFunc("/health", func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusOK)
		w.Write([]byte("OK"))
	})

	http.HandleFunc("/api/v1/apps", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		w.Header().Set("Access-Control-Allow-Origin", "*")
		json.NewEncoder(w).Encode(apps)
	})

	http.HandleFunc("/api/v1/telemetry", func(w http.ResponseWriter, r *http.Request) {
		if r.Method != http.MethodPost {
			http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
			return
		}
		w.WriteHeader(http.StatusAccepted)
		w.Write([]byte(`{"status":"received"}`))
	})

	log.Printf("Server starting on port %s...", port)
	if err := http.ListenAndServe(":"+port, nil); err != nil {
		log.Fatal(err)
	}
}
