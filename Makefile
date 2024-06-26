create-canisters:
	dfx canister create --all

deploy-backend:
	export CC_wasm32_wasi="/opt/wasi-sdk/bin/clang" && \
    export CFLAGS_wasm32_wasi="--sysroot=/opt/wasi-sdk/share/wasi-sysroot" && \
	cargo build --release --target wasm32-wasi && \
	cd ./target/wasm32-wasi/release && \
	wasi2ic sql_test_backend.wasm sql_test_backend.wasm && \
	candid-extractor sql_test_backend.wasm > ../../../src/sql-test-backend/sql-test-backend.did && \
	ic-wasm sql_test_backend.wasm -o sql_test_backend.wasm metadata candid:service -f ../../../src/sql-test-backend/sql-test-backend.did -v public && \
	gzip -c sql_test_backend.wasm > sql_test_backend.wasm.gz && \
	dfx deploy sql-test-backend

deploy-frontend:
	dfx generate sql-test-backend
	npm install
	dfx deploy sql-test-frontend

deploy-all: create-canisters deploy-backend deploy-frontend
