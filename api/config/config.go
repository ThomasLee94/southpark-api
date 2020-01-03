package config

import (
	"fmt"
	"log"

	"github.com/fsnotify/fsnotify"
	"github.com/globalsign/mgo"
	"github.com/spf13/viper"
)

type Constants struct {
	PORT  string
	Mongo struct {
		URL    string
		DBName string
	}
}

type Config struct {
	Constants
	Database *mgo.Database
}

// NewConfig is used to generate a configuration instance which will be passed around the codebase
func New() (*Config, error) {
	config := Config{}
	constants, err := initViper()
	config.Constants = constants
	if err != nil {
		return &config, err
	}
	dbSession, err := mgo.Dial(config.Constants.Mongo.URL)
	if err != nil {
		return &config, err
	}
	config.Database = dbSession.DB(config.Constants.Mongo.DBName)
	return &config, err
}

func initViper() (Constants, error) {
	viper.SetConfigName("todo.config") // Configuration fileName without the .TOML or .YAML extension
	viper.AddConfigPath(".")           // Search the root directory for the configuration file
	err := viper.ReadInConfig()        // Find and read the config file
	if err != nil {                    // Handle errors reading the config file
		return Constants{}, err
	}
	viper.WatchConfig() // Watch for changes to the configuration file and recompile
	viper.OnConfigChange(func(e fsnotify.Event) {
		fmt.Println("Config file changed:", e.Name)
	})
	viper.SetDefault("PORT", "8080")
	if err = viper.ReadInConfig(); err != nil {
		log.Panicf("Error reading config file, %s", err)
	}

	var constants Constants
	err = viper.Unmarshal(&constants)
	return constants, err
}
