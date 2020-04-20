import React from 'react'
import SearchableDropdown from 'react-native-searchable-dropdown';
import localization from "../utils/localization";
import {borderRadiusStyle, marginStyle, paddingStyle} from "../constants/Styles";
import Colors from "../constants/Colors";
import {YellowBox} from 'react-native'

YellowBox.ignoreWarnings([
    'VirtualizedLists should never be nested'
]);

export default ({items, selectedItem, setSelectedItem, itemWidth, textAlign, style, keyboardType}) => {

    const itemStyle = {
        backgroundColor: Colors.grayLight,
        borderColor: Colors.grayMedium,
        color: Colors.grayDark,
        width: itemWidth,
        textAlign: textAlign,
        ...paddingStyle(5)
    };

    return <SearchableDropdown
        style={style}
        onItemSelect={(item) => setSelectedItem(item.name)}
        containerStyle={{...marginStyle(5, 'top'), ...style}}
        itemStyle={itemStyle}
        itemTextStyle={{color: Colors.grayDark}}
        itemsContainerStyle={{borderColor: Colors.grayMedium, borderWidth: 1, ...borderRadiusStyle(5), ...marginStyle(1, 'top')}}
        items={items}
        textInputProps={
            {
                placeholder: localization('autocompletePlaceholder'),
                underlineColorAndroid: "transparent",
                autoCapitalize: "none",
                style: {...itemStyle, ...borderRadiusStyle(5), borderWidth: 1},
                keyboardType: keyboardType,
                defaultValue: selectedItem || '',
                onChangeText: text => setSelectedItem(text)
            }
        }
        listProps={
            {
                nestedScrollEnabled: true,
                maxHeight: 200
            }
        }
        setSort={(item, searchedText) =>
            item.aliases.some(
                alias => alias.toLowerCase().includes(searchedText.toLowerCase())
            )}
    />
}