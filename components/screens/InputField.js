import React from 'react'
import { View, Text, TextInput, TouchableOpacity } from 'react-native'
export default function InputField({valid, label, icon, inputType, keyBoardType, fieldButtonLabel, fieldButtonFunction }) {
	return (
		<View
			style={{
				flexDirection: 'row',
				borderBottomColor: "#ccc",
				borderBottomWidth: 1,
				paddingBottom: 8,
				marginBottom: 25
			}}
		>
			{icon}
			{
				inputType == 'password' ?
				(
					<TextInput
						placeholder={label}
						style={{
							flex: 1,
							paddingVertical: 0
						}}
							secureTextEntry={true}
							onChange={valid}
						/>
				)
				:
				(
					<TextInput
							placeholder={label}
							keyboardType={keyBoardType}
							style={{
								flex: 1,
								paddingVertical: 0
							}}
							onChange={valid}
					/>
				)
			}
			<TouchableOpacity onPress={() => { }}>
				<Text style={{ fontSize: 12, fontWeight: '500', color: '#0000FF' }}>{fieldButtonLabel}</Text>
			</TouchableOpacity>
		</View>
	)
}