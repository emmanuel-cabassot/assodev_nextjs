interface UserInterface {
    id: string;
    surname : string;
    email: string;
    password: string;
    role: string;
    profileImage?: string;
    refresh_token?: string;
    
  }
//   "id": 2,
//   "surname": "emmanuel",
//   "email": "emmanuel@gmail.com",
//   "password": "$argon2id$v=19$m=65536,t=3,p=4$sVvVCtumumkDyDz7h6GGAA$8qBn71bSPXuw86ICKx9PNznvlzuIeWBv9pxFK4dsDuc",
//   "role": "user",
//   "profileImage": "raid6ca631ddd-f7f7-4d2b-bc5b-abb254dd046c.png",
//   "refresh_token": "$argon2id$v=19$m=65536,t=3,p=4$NtxqmqSnGAiWQddOvUyk+w$069Vj//CjeDpe8BbeZFTf659uwzMcA84XHLfN9MPnnw",
//   "createdAt": "2023-01-14T00:54:23.555Z",
//   "updatedAt": "2023-01-22T12:33:57.000Z",
//   "deletedAt": null,

  export type { UserInterface };