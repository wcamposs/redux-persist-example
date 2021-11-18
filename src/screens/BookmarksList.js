// libraries
import React from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,  
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { MaterialCommunityIcons } from '@expo/vector-icons';

// store
import { removeBookmark } from '../redux/actions';

export default function BookmarksList() {
    const dispatch = useDispatch();
 
    // selectors
    const { bookmarks } = useSelector(state => state.booksReducer);
    
    // dispatch
    const removeFromBookmarkList = book => dispatch(removeBookmark(book));
  
    // functions
    const handleRemoveBookmark = book => {
      removeFromBookmarkList(book);
    };

    const renderItem = ({ item }) => {
        return (
          <View style={styles.itemContainer}>
            <View style={styles.itemRow}>
              <Image
                source={{ uri: item.image_url }}
                resizeMode='cover'
                style={styles.itemImage}
              />

              <View style={styles.metadataContainer}>
                  <Text style={styles.bookTitle}>
                    {item.title}
                  </Text>

                <View style={styles.metadataInfoContainer}>
                  <MaterialCommunityIcons
                    color='#64676D'
                    name='book-open-page-variant'
                    size={20}
                  />
                  <Text style={styles.textLabel}>
                    {item.num_pages}
                  </Text>
                  <MaterialCommunityIcons
                    color='#64676D'
                    name='star'
                    size={20}
                    style={styles.iconSpacer}
                  />
                  <Text style={styles.textLabel}>
                    {item.rating}
                  </Text>
                </View>

                  <TouchableOpacity
                    onPress={() => handleRemoveBookmark(item)}
                    activeOpacity={0.7}
                    style={styles.buttonsContainer}
                  >
                    <MaterialCommunityIcons
                      color='white'
                      size={24}
                      name='bookmark-remove'
                    />
                  </TouchableOpacity>
              </View>
            </View>
          </View>
        );
      };
    
      return (
        <SafeAreaView style={styles.viewContainer}>
          <View style={styles.container}>
            <Text style={styles.categoryTitle}>Bookmarks</Text>
            <View style={styles.flatlistContainer}>
              {bookmarks.length === 0 ? (
                <Text style={styles.emptyListText}>
                  Add a book to bookmark list.
                </Text>
              ) : (
                <FlatList
                  data={bookmarks}
                  keyExtractor={item => item.id.toString()}
                  renderItem={renderItem}
                  showsVerticalScrollIndicator={false}
                />
              )}
            </View>
          </View>
        </SafeAreaView>
      );
}

const styles = StyleSheet.create({
  // general container
  viewContainer: {
    flex: 1, 
    backgroundColor: '#1E1B26',
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
  flatlistContainer: {
    flex: 1, 
    marginTop: 8,
  },
  emptyListText: {
    color: '#64676D', 
    fontSize: 18,
  },

  // item component
  
  // general container
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