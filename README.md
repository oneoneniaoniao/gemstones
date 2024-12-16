## Gemstones
 <img width="260" alt="スクリーンショット 2024-12-14 21 05 54" src="https://github.com/user-attachments/assets/fea8d1f3-ef37-4b6d-b856-7945a7479809" />

## URL
https://gemstones.vercel.app

## Overview
Gemstones is a social networking app designed for showcasing handmade jewelry using natural stones.
The app allows users to browse without logging in. However, posting content requires authentication.

## Background
I created this app because I was into natural stone accessories for a while and thought it would be great to have a social networking app where people could showcase and search for such creations.

## Test Account
* email：test@test.com
* password：111111

Note: All data is for demonstration.

## Page Flow
<img width="654" alt="スクリーンショット 2024-12-16 11 34 33" src="https://github.com/user-attachments/assets/dc233e1d-153c-4d0e-8960-fee348b24b8a" />

## Features
* Authentication (Sign Up/ Login/ Logout/ Password Reset)
* User Profile Editing (Icon Image/ Display Name/ Profile)
* Create/Edit/Delete Posts
* Like Button
* Filter and Search
* Create/Delete Comments
* User Detail Pages

## Development Environment
### Frontend
* React(v18.2.0)
* Next.js(v13.0.6)
* Typescript
* Redux-toolKit
* MUI

### Backend
* Firebase (^9.16.0)

### deploy
* Vercel

## Highlights
* When users change their profile picture or delete a post, the corresponding image is also deleted from Firebase storage.
* The top page can be browsed (with sorting and filtering) even without logging in, but features like posting and liking are restricted to logged-in users.

## How To Use
| Top Page  | Sign Up | Login |
| ------------- | ------------- | ------------- |
| <img width="503" alt="スクリーンショット 2023-02-27 6 06 44" src="https://user-images.githubusercontent.com/76186907/221437349-fe97664e-22c2-4c31-98ed-35561000be33.png">  |  <img width="449" alt="スクリーンショット 2024-12-14 21 01 48" src="https://github.com/user-attachments/assets/1e30a4c8-8c04-4377-bd3a-32c03787fc99" />|<img width="435" alt="スクリーンショット 2024-12-14 21 01 56" src="https://github.com/user-attachments/assets/14669a80-98f8-484e-af39-c5664ab4f92f" />
|
| The top page displays a list of posts that can be viewed without logging in. | The sign-up popup allows users to register by providing an icon image (optional), username, email, and password. | The login modal allows users to log in using their email and password.|

| Sort & Filter | New Post | Edit & Delete |
| ------------- | ------------- | ------------- |
| <img width="602" alt="スクリーンショット 2023-02-27 6 32 52" src="https://user-images.githubusercontent.com/76186907/221438716-598433a5-4780-4aa6-846d-f37623f7fe41.png"> | ![img02](https://user-images.githubusercontent.com/76186907/221408382-29783c0f-31fa-41f4-ade2-b106540806de.png) | ![img03](https://user-images.githubusercontent.com/76186907/221408381-e2989203-a34c-44bb-bd87-eab807037635.png) |
| Users can filter posts by color, category, and type of gemstone. Posts can also be sorted by "most recent" or "most liked". | This is the screen for creating a new post. | This is the screen for editing or deleting posts (photo edit is not allowed).|

| My Page | Profile Edit | Password Reset　|
| ------------- | ------------- | ------------- |
| <img width="500" alt="スクリーンショット 2023-02-26 20 40 01" src="https://user-images.githubusercontent.com/76186907/221437717-6af8ac0d-cd73-42e0-a646-ae938533f590.png">　| ![img05](https://user-images.githubusercontent.com/76186907/221408428-8f6d7767-6174-4aad-aff0-59103bd61a79.png) |<img width="410" alt="スクリーンショット 2023-02-27 6 24 53" src="https://user-images.githubusercontent.com/76186907/221438176-ab6f7b95-fc3c-4878-b4f2-b1a3c10b9dea.png"> |
| The My Page screen displays the user's profile and their posts. | This is the profile edit modal. | This is the popup for sending a password reset email.|


