import {SafeAreaView, StyleSheet, View, ViewProps} from 'react-native';
import {useSearchArticlesQuery} from '../services/newsApi.ts';

export type HomeProps = Omit<ViewProps, 'children'> & {

}
const Home = (props: HomeProps) => {
  const {data} = useSearchArticlesQuery({keyword: 'apple'});

  console.log('data', data);

  return <SafeAreaView {...props}>
    <View style={styles.container} />
  </SafeAreaView>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Home;
