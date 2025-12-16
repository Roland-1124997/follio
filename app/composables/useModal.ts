interface ModalOptions {
    name: string;
    description: string;
    component: "FormSelect" | "FormInputUrl" | "Confirm";
    props: Record<string, any>;
}


const content = ref<ModalOptions>();
const opened = ref(false);

const isVisible = ref(false);
const isFullyVisible = ref(false);

watch(opened, (value) => {
    
    if (value) {
        isVisible.value = value;
        setTimeout(() => {
            isFullyVisible.value = value;
        }, 300);
    }

    else {
        isFullyVisible.value = value;
        setTimeout(() => {
            isVisible.value = value;
        }, 100);
    }
})

export const useModal = () => {

    const create = (options: ModalOptions) => {
        content.value = {
            name: options.name,
            description: options.description || '',
            component: options.component,
            props: options.props || {},
        }

        opened.value = true;
    };

    
    const close = () => {
        opened.value = false;
    };

    return {
        content,
        isVisible,
        isFullyVisible,
        create,
        close,
    };
};
