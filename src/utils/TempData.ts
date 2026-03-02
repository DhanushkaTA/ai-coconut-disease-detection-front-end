import type { PostTypes } from "./Types";

export const samplePosts: PostTypes[] = [
  {
    _id: "1",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas voluptate doloribus. This is a longer text to demonstrate see more functionality inside the feed post component.",
    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
    likes: ["u1", "u2"],
    createdBy: "u1",
    createdAt: new Date(),
    updatedAt: new Date(),
    commentCount: 3,
    user: {
      _id: "u1",
      firstName: "Ishara",
      lastName: "Herath",
      username: "ishara",
      profilePic:
        "https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/KatriAthokas.jpg",
      email: "ishara@test.com",
      phoneNumber: "0771234567",
      password: "",
      createdAt: new Date(),
      updatedAt: new Date(),
      role: "user",
    },
  },
  {
    _id: "2",
    content:
      "Short post text example.",
    image:
      "https://images.unsplash.com/photo-1492724441997-5dc865305da7",
    likes: [],
    createdBy: "u2",
    createdAt: new Date(),
    updatedAt: new Date(),
    commentCount: 0,
    user: {
      _id: "u2",
      firstName: "Nimal",
      lastName: "Perera",
      username: "nimal",
      profilePic:
        "https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/StefanBauer.jpg",
      email: "nimal@test.com",
      phoneNumber: "0712345678",
      password: "",
      createdAt: new Date(),
      updatedAt: new Date(),
      role: "user",
    },
  },
  {
    _id: "3",
    content:
      "Another long content example to test see more and show less functionality inside mapped posts. This helps us verify independent expand state per post item.",
    image:
      "https://images.unsplash.com/photo-1519681393784-d120267933ba",
    likes: ["u1"],
    createdBy: "u3",
    createdAt: new Date(),
    updatedAt: new Date(),
    commentCount: 5,
    user: {
      _id: "u3",
      firstName: "Kasun",
      lastName: "Silva",
      username: "kasun",
      profilePic:
        "https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/AnnieLindqvist.jpg",
      email: "kasun@test.com",
      phoneNumber: "0751234567",
      password: "",
      createdAt: new Date(),
      updatedAt: new Date(),
      role: "user",
    },
  },
  {
    _id: "4",
    content:
      "Medium length content example for testing.",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
    likes: [],
    createdBy: "u4",
    createdAt: new Date(),
    updatedAt: new Date(),
    commentCount: 1,
    user: {
      _id: "u4",
      firstName: "Saman",
      lastName: "Jayasinghe",
      username: "saman",
      profilePic:
        "https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/AdeleVance.jpg",
      email: "saman@test.com",
      phoneNumber: "0701234567",
      password: "",
      createdAt: new Date(),
      updatedAt: new Date(),
      role: "user",
    },
  },
];