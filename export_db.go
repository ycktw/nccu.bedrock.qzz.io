package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"log"
	"os"

	_ "github.com/go-sql-driver/mysql"
)

type Config struct {
	Database string `json:"database"`
	User     string `json:"user"`
	Password string `json:"Password"`
}

func LoadConfig(file string) Config {
	var config Config
	configFile, err := os.Open(file)
	defer configFile.Close()
	if err != nil {
		fmt.Println(err.Error())
	}
	jsonParser := json.NewDecoder(configFile)
	jsonParser.Decode(&config)
	return config
}

var dbCfg Config = LoadConfig("config/default.json")

// Book 對應你的資料表結構，只保留查詢需要的欄位以節省體積
type Book struct {
	Tno      string `json:"tno"`
	BookName string `json:"book_name"`
	Author   string `json:"author"`
	Publish  string `json:"publish"`
	Year     string `json:"year"`
	Room     string `json:"room"`
	Cat      string `json:"cat"`
}

func main() {
	// 1. 連線資料庫
	dsn := fmt.Sprintf("%s:%s@tcp(127.0.0.1:3306)/%s", dbCfg.User, dbCfg.Password, dbCfg.Database)
	db, err := sql.Open("mysql", dsn)
	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()

	// 2. 查詢書籍資料
	rows, err := db.Query("SELECT tno, book_name, author, publish, year, room, cat FROM hdbib")
	if err != nil {
		log.Fatal(err)
	}
	defer rows.Close()

	var books []Book
	for rows.Next() {
		var b Book
		if err := rows.Scan(&b.Tno, &b.BookName, &b.Author, &b.Publish, &b.Year, &b.Room, &b.Cat); err != nil {
			log.Fatal(err)
		}
		books = append(books, b)
	}

	// 3. 轉為 JSON 並寫入檔案
	file, _ := json.MarshalIndent(books, "", "  ")
	_ = os.WriteFile("data/library.json", file, 0644)

	fmt.Println("轉換成功！data/library.json 已產生，共", len(books), "筆資料。")
}
