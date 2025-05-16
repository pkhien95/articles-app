import {SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View, ViewProps} from 'react-native';
import {useSearchArticlesQuery} from '../services/newsApi.ts';
import {useCallback, useMemo, useState} from 'react';
import {skipToken} from '@reduxjs/toolkit/query';
import {debounce} from 'lodash';

export type HomeProps = Omit<ViewProps, 'children'> & {}
const Home = (props: HomeProps) => {
  const [keyword, setKeyword] = useState<string | null>('apple');
  const {data} = useSearchArticlesQuery(keyword ? {keyword} : skipToken);
  console.log('data', data);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const triggerSearch = useCallback(debounce((text: string) => {
    setKeyword(text);
  }, 500), []);

  const onChangeText = useCallback((text: string) => {
    if (text.length > 0) {
      triggerSearch(text);
    } else {
      setKeyword(null);
    }
  }, [triggerSearch]);

  const articles = useMemo(() => (data ?? []).slice(0, 10), [data]);

  return <SafeAreaView style={styles.safeArea} {...props}>
    <View style={styles.container}>
      <View style={styles.searchInput}>
        <TextInput placeholder={'Type something to search'} onChangeText={onChangeText}/>
      </View>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewContainer}>
        {articles.map((article, index) => (
          <View key={index} style={{marginBottom: 20}}>
            <Text>Author: {article.author}</Text>
            <Text style={styles.title}>{article.title}</Text>
            <Text style={styles.description}>{article.description}</Text>
          </View>
        ))}
      </ScrollView>
    </View>

  </SafeAreaView>;
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  searchInput: {
    borderRadius: 22,
    height: 44,
    borderWidth: 1,
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
  scrollView: {
    flexGrow: 1,
  },
  scrollViewContainer: {
    flex: 1,
    marginTop: 20,
  },
  title: {
    fontWeight: 'bold',
  },
  description: {
    marginTop: 8,
  },
});

export default Home;
