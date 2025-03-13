import {ReactNode, useCallback} from 'react';
import styles from '../styles/dataList.module.scss';
import {Button} from "shared/Button";

interface dataListProps<T extends object> {
    currentPage: number;
    itemsPerPage: number;
    totalPages: number;
    loading: boolean;
    data: T[];
    renderRow: (item: T | null, loading:boolean) => ReactNode;
    onPageChange: (page: number) => void;
}

export const DataList = <T extends object>(props: dataListProps<T>):ReactNode => {

    const { data,loading,currentPage,totalPages,onPageChange,itemsPerPage,renderRow } = props;


    const getContent = useCallback(() => {
        if(!data.length && !loading) {
            return (
                <div className={styles["paginated-list__no-content"]}>
                    No Data Found
                </div>
            )
        }

        return (
            <ul className={styles["paginated-list__items"]}>
                {loading && Array.from({length: itemsPerPage}).map((_, index) => (
                    <li key={index} className={styles["paginated-list__item"]}>
                        {renderRow(null, loading)}
                    </li>
                ))}
                {!loading && data.map((item, index) => (
                    <li key={index} className={styles["paginated-list__item"]}>
                        {renderRow(item, loading)}
                    </li>
                ))}
            </ul>
        )
    },[data,loading])

    return (
        <div className={styles["paginated-list"]}>
            {getContent()}
            <div className={styles['paginated-list__pagination']}>
                <Button
                    disabled={currentPage === 1}
                    onClick={() => onPageChange(currentPage - 1)}
                >
                    Previous
                </Button>
                <span>
                    {currentPage} / {totalPages}
                </span>
                <Button
                    disabled={currentPage >= totalPages}
                    onClick={() => onPageChange(currentPage + 1)}
                >
                    Next
                </Button>
            </div>



        </div>
    )
};