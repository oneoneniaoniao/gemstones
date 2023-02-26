# Gemstones(ハンドメイド天然石作品SNS)
![トップページ](https://user-images.githubusercontent.com/76186907/221407310-52238ae9-f3a5-40d2-9a99-1af50304c1d2.png)

## アプリ URL
https://gemstones-git-fix-41sort-oneoneniaoniao.vercel.app/

## アプリ概要
天然石のハンドメイド作品を紹介するSNS。

## アプリを作成した背景
最近天然石ブレスレットを作るようになり、作品を紹介したり検索出来るSNSがあると良いと思ったため。

## テスト用アカウント
* メールアドレス：test@test.com
* パスワード　　：111111

## 利用方法
| トップページ  | サインアップ | ログイン |
| ------------- | ------------- | ------------- |
| ![トップページ](https://user-images.githubusercontent.com/76186907/221408080-33f4d609-7088-4ef8-8e14-8d67a1c07d2e.png)  | ![サインアップ](https://user-images.githubusercontent.com/76186907/221408200-80fa03fb-8b33-483f-986a-1c190ee8ec0f.png) | ![ログイン](https://user-images.githubusercontent.com/76186907/221408103-c5aadc8a-48af-457f-a865-b58050a0a159.png) |
| Gemstonesのトップページです。ログインしていなくても投稿一覧を見ることができます | 新規登録モーダルです。アイコン画像、ユーザー名、メールアドレス、パスワードを登録します。 | ログインモーダルです。アカウントをお持ちの方はメールアドレス、パスワードを入力しログインします。|

| ソート＆フィルター | 新規投稿 | 編集＆削除 |
| ------------- | ------------- | ------------- |
| ![img01](https://user-images.githubusercontent.com/76186907/221408423-b8cff508-35c3-48d4-b867-c01d8c8f1456.png) | ![img02](https://user-images.githubusercontent.com/76186907/221408381-e2989203-a34c-44bb-bd87-eab807037635.png) | ![img03](https://user-images.githubusercontent.com/76186907/221408382-29783c0f-31fa-41f4-ade2-b106540806de.png) |
| 色、カテゴリー、天然石の種類でフィルターをかけられます。また、新着順といいね数順でソート出来ます（コメントは未実装）。 | 新規投稿画面です。 | 投稿の編集および削除画面です（写真を変更することは出来ません）。|

| マイページ | プロフィール編集 | 
| ------------- | ------------- | 
| ![img04](https://user-images.githubusercontent.com/76186907/221408370-e3753827-1cb0-4b59-85f3-f8312574cd45.png) | ![img05](https://user-images.githubusercontent.com/76186907/221408428-8f6d7767-6174-4aad-aff0-59103bd61a79.png) | 
| マイページです。プロフィールと自分の投稿を表示します。 | プロフィール編集モーダルです。 | 

## 機能一覧
* 認証（サインアップ/ログイン/ログアウト/パスワードリセット）
* ユーザー編集（アイコン画像/ユーザーネーム）
* 新規投稿/編集/削除
* いいねボタン
* フィルターおよび検索

## 実装予定の機能
* コメント機能

## 開発環境
### フロントエンド
* React(v18.2.0)
* Next.js(v13.0.6)
* Typescript
* Redux-toolKit
* MUI

### バックエンド
* Firebase (^9.16.0)

### デプロイ
* Vercel

## 工夫した点
* プロフィールの写真を変更した際に元の写真がfirebaseから削除されるようにした。

