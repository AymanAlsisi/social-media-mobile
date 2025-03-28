import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';
import { View } from 'react-native';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { app_colors } from '@/assets/colors/colors';

const CustomBottomSheet = forwardRef(({ children, snapPoints }, ref) => {
    const bottomSheetRef = useRef(null);

    const expand = useCallback(() => {
        bottomSheetRef.current?.expand()
    }, []);

    const close = useCallback(() => {
        bottomSheetRef.current?.close()
    }, []);

    useImperativeHandle(ref, () => ({
        openBS() {
            expand()
        },
        closeBS() {
            close()
        }
    }))

    return (
        <BottomSheet
            index={-1}
            enablePanDownToClose
            snapPoints={snapPoints}
            ref={bottomSheetRef}
            backgroundStyle={{ backgroundColor: app_colors.grey_secondary }}
            handleIndicatorStyle={{ backgroundColor: 'white' }}
        >
            <BottomSheetView style={{ display: 'flex', flexDirection: 'column' }}>
                {children}
            </BottomSheetView>
        </BottomSheet>
    );
})

export default CustomBottomSheet;