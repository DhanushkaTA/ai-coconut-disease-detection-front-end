import { Avatar } from "@fluentui/react-components";
import {
  NoteEditFilled,
  LeafTwoRegular,
  CommentRegular,
  LeafThreeFilled,
} from "@fluentui/react-icons";
import { samplePosts } from "../../utils/TempData";
import type { PostTypes } from "../../utils/Types";
import { useEffect, useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { useGetAllPostsQuery } from "../../service/postApi";
import PostCommentsDrawer from "../../component/postCommentsDrawer";
import PostDrawer from "../../component/postDrawer";

const UserPosrtView = () => {
  const [expandedPosts, setExpandedPosts] = useState<string[]>([]);

  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [commentDrawerOpen, setCommentDrawerOpen] = useState(false);

  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [page, setPage] = useState(1);

  const { data: posts, isLoading } = useGetAllPostsQuery({
    page,
    limit: 10,
    search: debouncedSearch,
  });

  console.log(posts);

  // useEffect(() => {
  //     const timer = setTimeout(() => {
  //       setDebouncedSearch(search);
  //       setPage(1); // reset page on new search
  //     }, 1000);

  //     return () => clearTimeout(timer);
  //   }, [search]);

  //   const truncateText = (text: string, maxLength: number) => {
  //     if (text.length <= maxLength) return text;
  //     return text.substring(0, maxLength) + "...";
  //   };

  const handleView = (id: string) => {
    setSelectedPostId(id);
    setCommentDrawerOpen(true);
  };

  return (
    <>
      {/* flex-col gap-3 */}
      <section className="flex flex-col bg-gray-700 flex-1 h-full items-center">
        <div className="overflow-y-auto h-full w-full md:w-[500px] bg-yellow-300 space-y-5 scroll-auto custom-scrollbar">
          {posts?.data.map((post: PostTypes) => {
            const isExpanded = expandedPosts.includes(post._id);

            return (
              // <div key={post._id}> {post._id} {post.user.username} </div>
              // {/* Post cart */}
              <div className="h-max min-h-[400px] w-full bg-red-500 mx-auto border border-gray-300 rounded-xl overflow-hidden">
                {/* Post header */}
                <div className="h-[45px] w-full bg-white mx-auto flex items-center p-1 gap-2">
                  <div>
                    <Avatar
                      name={post.user.firstName + " " + post.user.lastName}
                      image={{
                        src: post.user.profilePic || undefined,
                        // "https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/KatriAthokas.jpg"
                      }}
                    />
                  </div>

                  <div className="flex flex-col">
                    <h1 className="font-bold">
                      {post.user.firstName} {post.user.lastName}
                    </h1>
                    <span className="text-[10px] text-gray-500">
                      {formatDistanceToNow(new Date(post.createdAt), {
                        addSuffix: true,
                      })}
                    </span>
                  </div>
                </div>

                {/* Post content */}
                <div className="h-max min-h-[300px] w-full bg-green-500 mx-auto">
                  <div className="bg-white h-max min-h-[55px]">
                    {/* text content */}
                    {/* <p className="p-2">
                                    {truncateText(
                                        sampleText,
                                        100,
                                    )}
                                    {
                                        true && (<span className="text-gray-500 ml-2">more</span>)
                                    }
                                    </p> */}
                    <p className="p-2 text-sm min-h-[55px]">
                      {isExpanded
                        ? post.content
                        : post.content.length > 120
                          ? post.content.slice(0, 120) + "..."
                          : post.content}

                      {post.content.length > 120 && (
                        <span
                          onClick={() =>
                            setExpandedPosts((prev) =>
                              isExpanded
                                ? prev.filter((id) => id !== post._id)
                                : [...prev, post._id],
                            )
                          }
                          className="text-blue-500 ml-2 cursor-pointer font-medium"
                        >
                          {isExpanded ? "show less" : "more"}
                        </span>
                      )}
                    </p>

                    {/* post image */}
                    <div className="w-full h-[250px] bg-gray-300">
                      <img
                        src={post.image || undefined}
                        // "https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGFyaXN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>

                {/* Like , Comment bar */}
                <div className="h-[48px] w-full bg-white border-t border-gray-300 flex items-center justify-between px-2">
                  <div className="flex items-center justify-center gap-4 flex-1 hover:cursor-pointer">
                    <LeafThreeFilled fontSize={25} className="text-green-500" />{" "}
                    {post.likes.length}
                  </div>

                  <div className="flex items-center justify-center gap-4 flex-1 hover:cursor-pointer">
                    <CommentRegular
                      fontSize={25}
                      onClick={() => handleView(post._id)}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Post Comment Viewr */}
        <PostCommentsDrawer
          postId={selectedPostId}
          open={commentDrawerOpen}
          onClose={() => setCommentDrawerOpen(false)}
        />

        {/* NEw Post btn */}
        <div
          onClick={() => setDrawerOpen(true)}
          className="fixed bottom-10 right-10 bg-green-500 p-4 rounded-full text-white cursor-pointer hover:bg-green-600 transition"
        >
          <NoteEditFilled fontSize={20} />
        </div>
      </section>

      <PostDrawer
        drawerOpen={drawerOpen}
        setOpen={() => setDrawerOpen(false)}
        // postId={selectedPostId}
        postId={null} //698ae4aa530ca0205588214a
      />
    </>
  );
};

export default UserPosrtView;
