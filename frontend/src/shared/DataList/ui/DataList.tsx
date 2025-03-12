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


    const getContent = useCallback(() => {
        if(!props.data.length && !props.loading) {
            return (
                <div className={styles["paginated-list__no-content"]}>
                    No Data Found
                </div>
            )
        }

        return (
            <ul className={styles["paginated-list__items"]}>
                {props.loading && Array.from({length: props.itemsPerPage}).map((_, index) => (
                    <li key={index} className={styles["paginated-list__item"]}>
                        {props.renderRow(null, props.loading)}
                    </li>
                ))}
                {!props.loading && props.data.map((item, index) => (
                    <li key={index} className={styles["paginated-list__item"]}>
                        {props.renderRow(item, props.loading)}
                    </li>
                ))}
            </ul>
        )
    },[props.data,props.loading])

    return (
        <div className={styles["paginated-list"]}>
            {getContent()}
            <div className={styles['paginated-list__pagination']}>
                <Button
                    disabled={props.currentPage === 1}
                    onClick={() => props.onPageChange(props.currentPage - 1)}
                >
                    Previous
                </Button>
                <span>
                    {props.currentPage} / {props.totalPages}
                </span>
                <Button
                    disabled={props.currentPage >= props.totalPages}
                    onClick={() => props.onPageChange(props.currentPage + 1)}
                >
                    Next
                </Button>
            </div>



        </div>
    )
};