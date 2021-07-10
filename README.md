# Dockerイメージの作成

```commandline
docker-compose build
```

# Nodeプラグインのインストール

```commandline
docker-compose run --rm node sh -c "yarn install"
```

# Docker ComposeとReactアプリの実行

## 起動

```commandline
docker-compose up
```

## バックグランド起動

```commandline
docker-compose up -d
```

## シャットダウン

```commandline
docker-compose down
```

# コンテナへのログイン

```commandline
docker-compose exec node sh 
```