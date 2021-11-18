// libraries
import React, { useEffect } from "react";
import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { MaterialCommunityIcons } from "@expo/vector-icons";

// store
import { getBooks, addBookmark, removeBookmark } from "../redux/actions";

export default function BooksListApp() {
  const dispatch = useDispatch();

  // selectors
  const { books, bookmarks } = useSelector((state) => state.booksReducer);

  // consts
  const ifExists = (book) => {
    if (bookmarks.filter((item) => item.id === book.id).length > 0) {
      return true;
    }

    return false;
  };

  // dispatches
  const fetchBooks = () => dispatch(getBooks());
  const addToBookmarkList = (book) => dispatch(addBookmark(book));
  const removeFromBookmarkList = (book) => dispatch(removeBookmark(book));

  // effects
  useEffect(() => {
    fetchBooks();
  }, []);

  // functions
  const handleAddBookmark = (book) => {
    addToBookmarkList(book);
  };

  const handleRemoveBookmark = (book) => {
    removeFromBookmarkList(book);
  };

  // renders
  const renderItem = ({ item }) => {
    return (
      <View style={styles.itemContainer}>
        <View style={styles.itemRow}>
          <Image
            source={{ uri: item.image_url }}
            resizeMode="cover"
            style={styles.itemImage}
          />

          <View style={styles.metadataContainer}>
            <Text style={styles.bookTitle}>{item.title}</Text>

            <View style={styles.metadataInfoContainer}>
              <MaterialCommunityIcons
                color="#64676D"
                name="book-open-page-variant"
                size={20}
              />
              <Text style={styles.textLabel}>{item.num_pages}</Text>
              <MaterialCommunityIcons
                color="#64676D"
                name="star"
                size={20}
                style={styles.iconSpacer}
              />
              <Text style={styles.textLabel}>{item.rating}</Text>
            </View>

            <View style={styles.buttonsContainer}>
              <TouchableOpacity
                onPress={() =>
                  ifExists(item)
                    ? handleRemoveBookmark(item)
                    : handleAddBookmark(item)
                }
                activeOpacity={0.7}
              >
                <MaterialCommunityIcons
                  color={ifExists(item) ? "white" : "#64676D"}
                  size={24}
                  name={ifExists(item) ? "bookmark" : "bookmark-outline"}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.viewContainer}>
      <View style={styles.container}>
        <Text style={styles.categoryTitle}>Bestsellers</Text>
        <View style={styles.flatListContainer}>
          <FlatList
            data={books}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  // general view
  viewContainer: {
    flex: 1,
    backgroundColor: "#1E1B26",
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  categoryTitle: {
    color: "white",
    fontSize: 24,
    marginTop: '4%',
    textAlign: 'center',
    fontWeight: '700',
  },
  flatListContainer: {
    flex: 1,
    marginTop: 8,
  },

  // renderItem

  // item container
  itemContainer: {
    marginVertical: 12,
  },
  itemRow: {
    flexDirection: "row",
    flex: 1,
  },
  itemImage: {
    width: 100,
    height: 150,
    borderRadius: 10,
  },

  // metadata container
  metadataContainer: {
    flex: 1,
    marginLeft: 12,
  },
  bookTitle: {
    fontSize: 22,
    paddingRight: 16,
    color: "white",
  },
  metadataInfoContainer: {
    flexDirection: "row",
    marginTop: 10,
    alignItems: "center",
  },
  textLabel: {
    fontSize: 14,
    paddingLeft: 10,
    color: "#64676D",
  },
  iconSpacer: {
    paddingLeft: 16,
  },

  // buttons
  buttonsContainer: {
    marginTop: 14,
    flexDirection: "row",
    padding: 2,
    backgroundColor: "#2D3038",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    height: 40,
    width: 40,
  },
});
