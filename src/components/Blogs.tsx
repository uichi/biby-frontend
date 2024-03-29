import {
  Provider,
  defaultTheme,
  View,
  Text,
  ActionButton,
  Link,
  Heading,
} from "@adobe/react-spectrum";
import Header from "./Header";
import Footer from "./Footer";
import { Link as RouterLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { Redirect } from "react-router-dom";
import { getBlogs } from "../api/Blog";
import Loading from "./common/Loading";
import scrollToTop from "./common/scrollToTop";

const Blogs = (): JSX.Element => {
  const [cookies, setCookie] = useCookies(); // eslint-disable-line
  if (!cookies.authToken) return <Redirect to="/login" />;
  const [isLoaded, setIsLoaded] = useState<boolean>(true);
  const [blogs, setBlogs] = useState<any[]>([]);
  scrollToTop();
  useEffect(() => {
    let cleanedUp = false;
    (async () => {
      let resultBlogs: any = [];
      if (cookies.selectedPet)
        resultBlogs = await getBlogs(cookies.selectedPet, 100, 0);
      if (cleanedUp) return;
      setBlogs(resultBlogs);
      setIsLoaded(false);
    })();
    const cleanup = () => {
      cleanedUp = true;
    };
    return cleanup;
  }, []);
  return (
    <Provider theme={defaultTheme} colorScheme="dark">
      {isLoaded && <Loading />}
      <Header />
      <View
        backgroundColor="gray-200"
        gridArea="content"
        minHeight="100vh"
        paddingTop="8vh"
        paddingBottom="20vh"
      >
        <View marginStart="size-100" marginTop="size-100">
          <h2>ブログ一覧</h2>
        </View>
        {blogs.length === 0 && (
          <View marginStart="size-100" marginTop="size-100">
            ホームでペットを選択してください
          </View>
        )}
        {blogs.map((blog, index) => (
          <Link variant="secondary" key={index} isQuiet>
            <RouterLink to={"/blog/edit/" + blog.id}>
              <View
                alignSelf="center"
                backgroundColor="gray-400"
                borderRadius="small"
                padding="size-100"
                margin="size-100"
                minHeight="size-800"
              >
                <View>{blog.pet.name}</View>
                <View>
                  <Heading level={3} margin="size-0" marginBottom="size-50">
                    {blog.title}
                  </Heading>
                </View>
                <View>
                  {(() => {
                    const dateTime = new Date(blog.publish_date_time);
                    if (!dateTime) return <Text>非公開</Text>;
                    const year = dateTime.getFullYear();
                    const month = ("00" + (dateTime.getMonth() + 1)).slice(-2);
                    const day = ("00" + dateTime.getDate()).slice(-2);
                    const hour = ("00" + dateTime.getHours()).slice(-2);
                    const minute = ("00" + dateTime.getMinutes()).slice(-2);
                    return (
                      <Text>
                        公開日：{year}年{month}月{day}日 {hour}時{minute}分
                      </Text>
                    );
                  })()}
                </View>
              </View>
            </RouterLink>
          </Link>
        ))}
        <View position="fixed" width="100%" bottom="size-700">
          <Link variant="secondary" margin="size-100" isQuiet>
            <RouterLink to="/blog/add">
              <ActionButton bottom="size-0" width="calc(100% - size-200)">
                <Text>ブログを投稿する</Text>
              </ActionButton>
            </RouterLink>
          </Link>
        </View>
      </View>
      <Footer />
    </Provider>
  );
};

export default Blogs;
