import React from 'react'
import { View, Text } from 'react-native'
import styles from '../style/style'
export default function Footer() {
    return (
        <View style={styles.footer}>
            <Text style={styles.bigtext}>Author: Teemu Leinonen</Text>
        </View>
    )
}
