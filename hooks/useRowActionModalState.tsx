import { useCallback, useMemo, useState } from "react";

interface UseRowActionModalStateOptions {
    enableView?: boolean;
    enableEdit?: boolean;
    enableDelete?: boolean;
}

export const useRowActionModalState = <TData,>({
    enableView = true,
    enableEdit = true,
    enableDelete = true,
}: UseRowActionModalStateOptions = {}) => {
    // Core item states
    const [viewingItem, setViewingItem] = useState<TData | null>(null);
    const [editingItem, setEditingItem] = useState<TData | null>(null);
    const [deletingItem, setDeletingItem] = useState<TData | null>(null);

    // Dialog open/close visibility states
    const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

    // Row interaction trigger handlers
    const handleView = useCallback((item: TData) => {
        setViewingItem(item);
        setIsViewDialogOpen(true);
    }, []);

    const handleEdit = useCallback((item: TData) => {
        setEditingItem(item);
        setIsEditModalOpen(true);
    }, []);

    const handleDelete = useCallback((item: TData) => {
        setDeletingItem(item);
        setIsDeleteDialogOpen(true);
    }, []);

    // Dialog state synchronization open-change listeners
    const onViewOpenChange = useCallback((open: boolean) => {
        setIsViewDialogOpen(open);
        if (!open) setViewingItem(null);
    }, []);

    const onEditOpenChange = useCallback((open: boolean) => {
        setIsEditModalOpen(open);
        if (!open) setEditingItem(null);
    }, []);

    const onDeleteOpenChange = useCallback((open: boolean) => {
        setIsDeleteDialogOpen(open);
        if (!open) setDeletingItem(null);
    }, []);

    // Memoized actions passed down into the <DataTable /> action interface
    const tableActions = useMemo(() => {
        return {
            onView: enableView ? handleView : undefined,
            onEdit: enableEdit ? handleEdit : undefined,
            onDelete: enableDelete ? handleDelete : undefined,
        };
    }, [
        enableView,
        enableEdit,
        enableDelete,
        handleView,
        handleEdit,
        handleDelete,
    ]);

    return {
        // Active contextual row records
        viewingItem,
        editingItem,
        deletingItem,

        // Modal open boolean parameters
        isViewDialogOpen,
        isEditModalOpen,
        isDeleteDialogOpen,

        // Action callback modifiers
        onViewOpenChange,
        onEditOpenChange,
        onDeleteOpenChange,

        // Table action registry bundle
        tableActions,
    };
};