// components/statementFormatModal.jsx
import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Modal,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from 'config/theme';

export default function StatementFormatModal({
    visible,
    onClose,
    onSelect,
    isDownloading = false,
}) {
    return (
        <Modal
            visible={visible}
            transparent
            animationType="slide"
            onRequestClose={isDownloading ? undefined : onClose}>
            <View style={{ flex: 1 }}>
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    style={{ flex: 1, justifyContent: 'flex-end' }}>

                    {/* Backdrop */}
                    <TouchableOpacity
                        activeOpacity={1}
                        onPress={isDownloading ? undefined : onClose}
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            backgroundColor: 'rgba(0,0,0,0.5)',
                        }}
                    />

                    {/* Sheet */}
                    <View
                        style={{
                            backgroundColor: 'white',
                            borderTopLeftRadius: 28,
                            borderTopRightRadius: 28,
                            paddingHorizontal: 24,
                            paddingBottom: 40,
                            paddingTop: 20,
                        }}>

                        {/* Handle + close row */}
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 24 }}>
                            <View style={{ width: 32 }} />
                            <View style={{ flex: 1, alignItems: 'center' }}>
                                <View
                                    style={{ width: 40, height: 4, borderRadius: 2, backgroundColor: '#D1D5DB' }}
                                />
                            </View>
                            {!isDownloading ? (
                                <TouchableOpacity
                                    onPress={onClose}
                                    activeOpacity={0.7}
                                    style={{ width: 32, alignItems: 'flex-end' }}>
                                    <View
                                        style={{
                                            width: 32,
                                            height: 32,
                                            borderRadius: 16,
                                            backgroundColor: '#F3F4F6',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}>
                                        <Ionicons name="close" size={18} color="#374151" />
                                    </View>
                                </TouchableOpacity>
                            ) : (
                                <View style={{ width: 32 }} />
                            )}
                        </View>

                        {/* Title */}
                        <Text
                            style={{
                                textAlign: 'center',
                                fontSize: 20,
                                fontWeight: '700',
                                color: '#111827',
                                marginBottom: 6,
                            }}>
                            Download Statement
                        </Text>
                        <Text
                            style={{
                                textAlign: 'center',
                                fontSize: 13,
                                color: '#6B7280',
                                marginBottom: 32,
                            }}>
                            Choose the format for your statement
                        </Text>

                        {/* PDF Option */}
                        <TouchableOpacity
                            onPress={() => onSelect('pdf')}
                            disabled={isDownloading}
                            activeOpacity={0.7}
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                padding: 16,
                                borderWidth: 1.5,
                                borderColor: '#E5E7EB',
                                borderRadius: 16,
                                marginBottom: 12,
                                opacity: isDownloading ? 0.5 : 1,
                            }}>
                            <View
                                style={{
                                    width: 48,
                                    height: 48,
                                    borderRadius: 12,
                                    backgroundColor: '#FEE2E2',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginRight: 16,
                                }}>
                                <Ionicons name="document-text-outline" size={24} color="#DC2626" />
                            </View>
                            <View style={{ flex: 1 }}>
                                <Text style={{ fontSize: 15, fontWeight: '600', color: '#111827' }}>
                                    PDF Document
                                </Text>
                                <Text style={{ fontSize: 12, color: '#6B7280', marginTop: 3 }}>
                                    Best for printing and sharing
                                </Text>
                            </View>
                            <View
                                style={{
                                    width: 32,
                                    height: 32,
                                    borderRadius: 16,
                                    backgroundColor: '#F3F4F6',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}>
                                <Ionicons name="chevron-forward" size={16} color="#6B7280" />
                            </View>
                        </TouchableOpacity>

                        {/* Excel Option */}
                        <TouchableOpacity
                            onPress={() => onSelect('excel')}
                            disabled={isDownloading}
                            activeOpacity={0.7}
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                padding: 16,
                                borderWidth: 1.5,
                                borderColor: '#E5E7EB',
                                borderRadius: 16,
                                marginBottom: 32,
                                opacity: isDownloading ? 0.5 : 1,
                            }}>
                            <View
                                style={{
                                    width: 48,
                                    height: 48,
                                    borderRadius: 12,
                                    backgroundColor: '#DCFCE7',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginRight: 16,
                                }}>
                                <Ionicons name="grid-outline" size={24} color="#16A34A" />
                            </View>
                            <View style={{ flex: 1 }}>
                                <Text style={{ fontSize: 15, fontWeight: '600', color: '#111827' }}>
                                    Excel Spreadsheet
                                </Text>
                                <Text style={{ fontSize: 12, color: '#6B7280', marginTop: 3 }}>
                                    Best for data and analysis
                                </Text>
                            </View>
                            <View
                                style={{
                                    width: 32,
                                    height: 32,
                                    borderRadius: 16,
                                    backgroundColor: '#F3F4F6',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}>
                                <Ionicons name="chevron-forward" size={16} color="#6B7280" />
                            </View>
                        </TouchableOpacity>

                        {/* Cancel */}
                        <TouchableOpacity
                            onPress={onClose}
                            disabled={isDownloading}
                            activeOpacity={0.7}
                            style={{
                                alignItems: 'center',
                                paddingVertical: 14,
                                borderRadius: 12,
                                backgroundColor: '#F3F4F6',
                                opacity: isDownloading ? 0.5 : 1,
                            }}>
                            <Text style={{ fontSize: 15, color: '#374151', fontWeight: '600' }}>
                                Cancel
                            </Text>
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>
            </View>
        </Modal>
    );
}