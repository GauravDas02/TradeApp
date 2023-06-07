import React, { useEffect, useState } from 'react';
//import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { Table, Row } from 'react-native-table-component';
import { fetchCoinData } from './api';
import { View, Text, StyleSheet, ActivityIndicator, AsyncStorage } from 'react-native';

const CoinTableView = () => {
  const [coins, setCoins] = useState(null);
  const [sort, setSort] = useState({ column: 'price', order: 'asc' });

 // useEffect(() => {
 //   const getCoins = async () => {
 //     try {
 //       const data = await fetchCoinData();
 //       setCoins(data);
 //     } catch (error) {
 //       console.log(error);
 //     }
 //   };
 //
 //   getCoins();
 // }, []);

  useEffect(() => {
    const getCoins = async () => {
      try {
        // Check if data exists in storage
        const cachedData = await AsyncStorage.getItem('coins');
        if (cachedData !== null) {
          setCoins(JSON.parse(cachedData));
          return;
        }

        const data = await fetchCoinData();
        setCoins(data);
        // Save data to storage
        AsyncStorage.setItem('coins', JSON.stringify(data));
      } catch (error) {
        console.log(error);
      }
    };

    getCoins();
  }, []);

  //const sortData = (column, order) => {
  //  const sortFn = (a, b) => {
  //    if (order === 'asc') {
  //      return parseFloat(a[column]) - parseFloat(b[column]);
  //    } else {
  //      return parseFloat(b[column]) - parseFloat(a[column]);
  //    }
  //  };
  //  const sortedData = coins.sort(sortFn);
  //  setCoins(sortedData);
  //  setSort({ column, order });
  //};

  const sortData = (column, order) => {
    const sortFn = (a, b) => {
      if (order === 'asc') {
        return parseFloat(a[column]) - parseFloat(b[column]);
      } else {
        return parseFloat(b[column]) - parseFloat(a[column]);
      }
    };
    const sortedData = coins.sort(sortFn);
    setCoins(sortedData);
    setSort({ column, order });
    // Update sorted data in storage
    AsyncStorage.setItem('coins', JSON.stringify(sortedData));
  };
  
  return (
    <View>
      {coins ? (
        <Table>
          <Row
            data={['Symbol', 'Price', 'Volume']}
            style={styles.head}
            textStyle={styles.text}
            onPress={() => sortData('symbol', sort.order === 'asc' ? 'desc' : 'asc')}
          />
          {coins.map((coin, index) => (
            <Row
              key={index}
              data={[coin.symbol, coin.price, coin.volume]}
              style={styles.row}
              textStyle={styles.text}
            />
          ))}
        </Table>
      ) : (
        <ActivityIndicator size="large" />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  head: { height: 40, backgroundColor: '#f1f8ff' },
  text: { margin: 6 },
  row: { height: 28 },
});

export default CoinTableView;