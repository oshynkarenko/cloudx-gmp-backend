aws dynamodb put-item \
    --table-name CloudX-GMP-Products  \
    --item \
        '{"id": {"S": "7567ec4b-b10c-48c5-9345-fc73c48a80aa"}, "title": {"S": "ProductOne"}, "description": {"S": "Short Product Description1"}, "price": {"N": "2.4"}}' \

aws dynamodb put-item \
    --table-name CloudX-GMP-Products  \
    --item \
        '{"id": {"S": "7567ec4b-b10c-48c5-9345-fc73c48a80a2"}, "title": {"S": "ProductTwo"}, "description": {"S": "Short Product Description2"}, "price": {"N": "23"}}' \

aws dynamodb put-item \
    --table-name CloudX-GMP-Products  \
    --item \
        '{"id": {"S": "7567ec4b-b10c-48c5-9345-fc73c48a80a0"}, "title": {"S": "ProductThree"}, "description": {"S": "Short Product Description3"}, "price": {"N": "10"}}' \

aws dynamodb put-item \
    --table-name CloudX-GMP-Products  \
    --item \
        '{"id": {"S": "7567ec4b-b10c-48c5-9345-fc73c48a80a1"}, "title": {"S": "ProductFour"}, "description": {"S": "Short Product Description4"}, "price": {"N": "15"}}' \

aws dynamodb put-item \
    --table-name CloudX-GMP-Products  \
    --item \
        '{"id": {"S": "7567ec4b-b10c-48c5-9345-fc73c48a80a3"}, "title": {"S": "ProductFive"}, "description": {"S": "Short Product Description5"}, "price": {"N": "23"}}' \

aws dynamodb put-item \
    --table-name CloudX-GMP-Products  \
    --item \
        '{"id": {"S": "7567ec4b-b10c-48c5-9345-fc73348a80a1"}, "title": {"S": "ProductSix"}, "description": {"S": "Short Product Description6"}, "price": {"N": "15"}}' \

aws dynamodb put-item \
    --table-name CloudX-GMP-Products  \
    --item \
        '{"id": {"S": "7567ec4b-b10c-48c5-9445-fc73c48a80a2"}, "title": {"S": "ProductSeven"}, "description": {"S": "Short Product Description7"}, "price": {"N": "23"}}' \

aws dynamodb put-item \
    --table-name CloudX-GMP-Products  \
    --item \
        '{"id": {"S": "7567ec4b-b10c-45c5-9345-fc73c48a80a1"}, "title": {"S": "ProductEight"}, "description": {"S": "Short Product Description8"}, "price": {"N": "15"}}' \
