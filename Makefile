create-canisters:
	dfx canister create --all

deploy-backend:
	export CC_wasm32_wasip1="/opt/wasi-sdk/bin/clang" && \
    export CFLAGS_wasm32_wasip1="--sysroot=/opt/wasi-sdk/share/wasi-sysroot" && \
	cargo build --release --target wasm32-wasip1 && \
	cd ./target/wasm32-wasip1/release && \
	wasi2ic backend.wasm backend.wasm && \
	candid-extractor backend.wasm > ../../../src/backend/backend.did && \
	ic-wasm backend.wasm -o backend.wasm metadata candid:service -f ../../../src/backend/backend.did -v public && \
	gzip -c backend.wasm > backend.wasm.gz && \
	dfx deploy backend

deploy-frontend:
	dfx generate backend
	npm install
	dfx deploy frontend

deploy-all: create-canisters deploy-backend deploy-frontend
