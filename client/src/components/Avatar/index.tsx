function Avatar() {
    return ( <div className="flex items-center">
        <div className="h-full">
            <img style={{border: "2px solid var(--yellow-color)"}} src="https://t-cf.bstatic.com/static/img/identity/profile/b47cd0e05ec8b7831167f4f7593ead56402a6bb4.svg" className="w-7 rounded-full" alt="" />
        </div>
        <div className="ml-2">
            <div className="text-white text-sm font-medium">Nguyễn Văn Tùng</div>
            <div className="text-xs" style={({color:" var(--yellow-color)"})}>Genius Level 1</div>
        </div>
    </div> );
}

export default Avatar;