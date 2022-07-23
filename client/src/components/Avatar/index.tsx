function Avatar() {
    return ( <div className="flex items-center">
        <div className="h-full">
            <img style={{border: "2px solid var(--yellow-color)"}} src="https://lh3.googleusercontent.com/a-/AFdZucpPuuCThV0AJemjK8CbI10WuzJoFjwRuGzMUPnYcQ=s96-c?sz=64" className="w-7 rounded-full" alt="" />
        </div>
        <div className="ml-2">
            <div className="text-white text-sm font-medium">Nguyễn Văn Tùng</div>
            <div className="text-xs" style={({color:" var(--yellow-color)"})}>Genius Level 1</div>
        </div>
    </div> );
}

export default Avatar;