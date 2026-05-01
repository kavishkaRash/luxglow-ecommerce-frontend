


{
    isModelOpen && (
        <div className="fixed inset-0 bg-black/50  flex flex-col items-center justify-center z-50">
            <div className=" w-[400px] h-[200px] bg-primary relative flex flex-col justify-center items-center gap-[40px] p-6"></div>
        </div>
    )
}

onClick = {() => {
    setSelectedOrder(item);
    setIsModelOpen(true);
}}

const [isModelOpen, setIsModelOpen] = useState(false);
const [selectedOrder, setSelectedOrder] = useState(null);