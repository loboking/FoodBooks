/**
 * FoodBooks - 초기 레시피 데이터 (35개 이상)
 * 실제 요리 가능한 레시피들 + 세부 카테고리
 * 이미지: Unsplash (무료/저작권 없음, 상업적 사용 가능)
 */

const SeedData = {
    recipes: [
        {
            title: '김치찌개',
            description: '돼지고기와 잘 익은 김치로 만드는 얼큰하고 깊은 맛의 한국 대표 찌개',
            category: 'korean',
            subcategory: '찌개/국',
            difficulty: 'easy',
            prepTime: 10,
            cookTime: 25,
            servings: 2,
            image: 'https://images.unsplash.com/photo-1495195134817-aeb325a55b65?w=800',
            isVerified: false,
            imageVerified: false,
            ingredients: [
                { name: '묵은지', amount: '200', unit: 'g', category: 'vegetables' },
                { name: '돼지고기 앞다리살', amount: '150', unit: 'g', category: 'meat' },
                { name: '두부', amount: '1/2', unit: '모', category: 'other' },
                { name: '대파', amount: '1', unit: '대', category: 'vegetables' },
                { name: '고춧가루', amount: '1', unit: '큰술', category: 'seasoning' },
                { name: '다진 마늘', amount: '1', unit: '큰술', category: 'seasoning' },
                { name: '물', amount: '400', unit: 'ml', category: 'other' }
            ],
            steps: [
                { text: '돼지고기는 한입 크기로 썰고, 김치도 먹기 좋은 크기로 썬다.' },
                { text: '냄비에 참기름을 두르고 돼지고기를 중불에서 볶는다.' },
                { text: '고기가 반쯤 익으면 김치를 넣고 함께 3분간 볶는다.' },
                { text: '물을 붓고 고춧가루, 다진 마늘을 넣어 센불로 끓인다.' },
                { text: '끓어오르면 중불로 줄이고 15분간 더 끓인다.' },
                { text: '두부를 넣고 5분간 더 끓인 후 대파를 올려 마무리한다.' }
            ],
            tags: ['매운', '국물', '간단', '저녁'],
            famousRestaurants: [
                { name: '뚝도리탕', location: '서울 성동구', searchKeyword: '뚝도리탕 김치찌개' },
                { name: '김치찌개 전문 옛날집', location: '서울 종로구', searchKeyword: '종로 김치찌개 옛날집' },
                { name: '백종원의 골목식당 김치찌개', location: '서울 마포구', searchKeyword: '마포 김치찌개 맛집' }
            ]
        },
        {
            title: '된장찌개',
            description: '구수한 된장과 신선한 채소가 어우러진 한국의 전통 찌개',
            category: 'korean',
            subcategory: '찌개/국',
            difficulty: 'easy',
            prepTime: 15,
            cookTime: 20,
            servings: 2,
            image: 'https://images.unsplash.com/photo-1495195134817-aeb325a55b65?w=800',
            isVerified: false,
            imageVerified: false,
            ingredients: [
                { name: '된장', amount: '2', unit: '큰술', category: 'seasoning' },
                { name: '애호박', amount: '1/2', unit: '개', category: 'vegetables' },
                { name: '감자', amount: '1', unit: '개', category: 'vegetables' },
                { name: '두부', amount: '1/2', unit: '모', category: 'other' },
                { name: '청양고추', amount: '1', unit: '개', category: 'vegetables' },
                { name: '멸치 다시마 육수', amount: '500', unit: 'ml', category: 'other' }
            ],
            steps: [
                { text: '감자, 애호박은 깍둑썰기하고, 두부도 비슷한 크기로 썬다.' },
                { text: '냄비에 육수를 붓고 된장을 풀어준다.' },
                { text: '감자를 먼저 넣고 중불에서 10분간 끓인다.' },
                { text: '애호박, 두부를 넣고 5분간 더 끓인다.' },
                { text: '청양고추, 대파를 넣고 한소끔 더 끓여 마무리한다.' }
            ],
            tags: ['건강', '국물', '간단'],
            famousRestaurants: [
                { name: '북창동순두부', location: '서울 중구', searchKeyword: '북창동순두부 된장찌개' },
                { name: '시골밥상', location: '서울 강남구', searchKeyword: '강남 된장찌개 맛집' }
            ]
        },
        {
            title: '순두부찌개',
            description: '부드러운 순두부와 매콤한 양념이 조화로운 찌개',
            category: 'korean',
            subcategory: '찌개/국',
            difficulty: 'easy',
            prepTime: 10,
            cookTime: 15,
            servings: 1,
            image: 'https://images.unsplash.com/photo-1495195134817-aeb325a55b65?w=800',
            isVerified: false,
            imageVerified: false,
            ingredients: [
                { name: '순두부', amount: '1', unit: '봉', category: 'other' },
                { name: '돼지고기 또는 해물', amount: '50', unit: 'g', category: 'meat' },
                { name: '계란', amount: '1', unit: '개', category: 'dairy' },
                { name: '고춧가루', amount: '1', unit: '큰술', category: 'seasoning' },
                { name: '새우젓', amount: '1/2', unit: '작은술', category: 'seasoning' }
            ],
            steps: [
                { text: '뚝배기에 식용유를 두르고 고춧가루를 볶아 기름을 낸다.' },
                { text: '고기 또는 해물을 넣고 볶는다.' },
                { text: '물을 붓고 끓으면 순두부를 넣는다.' },
                { text: '새우젓으로 간을 맞추고 계란을 깨넣는다.' },
                { text: '계란이 반숙이 되면 대파를 올려 완성한다.' }
            ],
            tags: ['매운', '국물', '간단', '야식'],
            famousRestaurants: [
                { name: '북창동순두부', location: '서울 중구', searchKeyword: '북창동순두부' },
                { name: '조선궁 순두부', location: '서울 종로구', searchKeyword: '종로 순두부찌개' }
            ]
        },
        {
            title: '미역국',
            description: '생일에 빠질 수 없는 소고기 미역국',
            category: 'korean',
            subcategory: '찌개/국',
            difficulty: 'easy',
            prepTime: 20,
            cookTime: 30,
            servings: 4,
            image: 'https://images.unsplash.com/photo-1495195134817-aeb325a55b65?w=800',
            isVerified: false,
            imageVerified: false,
            ingredients: [
                { name: '건미역', amount: '20', unit: 'g', category: 'vegetables' },
                { name: '소고기 국거리', amount: '150', unit: 'g', category: 'meat' },
                { name: '참기름', amount: '1', unit: '큰술', category: 'seasoning' },
                { name: '국간장', amount: '2', unit: '큰술', category: 'seasoning' },
                { name: '다진 마늘', amount: '1', unit: '큰술', category: 'seasoning' },
                { name: '물', amount: '1.5', unit: 'L', category: 'other' }
            ],
            steps: [
                { text: '건미역은 찬물에 20분간 불려 먹기 좋게 자른다.' },
                { text: '소고기는 키친타올로 핏물을 닦는다.' },
                { text: '냄비에 참기름을 두르고 소고기를 볶는다.' },
                { text: '미역을 넣고 함께 5분간 볶는다.' },
                { text: '물을 붓고 센불에서 끓인 후 중불로 줄여 20분 끓인다.' },
                { text: '국간장, 다진 마늘로 간을 맞춘다.' }
            ],
            tags: ['건강', '국물', '생일'],
            famousRestaurants: [
                { name: '진미평양냉면', location: '서울 중구', searchKeyword: '진미평양냉면 미역국' },
                { name: '미역국 전문점', location: '서울 강남구', searchKeyword: '강남 미역국 맛집' }
            ]
        },
        {
            title: '불고기',
            description: '달콤한 간장 양념에 재운 소고기를 구워낸 한국의 대표 고기 요리',
            category: 'korean',
            subcategory: '볶음/구이',
            difficulty: 'medium',
            prepTime: 30,
            cookTime: 15,
            servings: 3,
            image: 'https://images.unsplash.com/photo-1495195134817-aeb325a55b65?w=800',
            isVerified: false,
            imageVerified: false,
            ingredients: [
                { name: '소고기 불고기용', amount: '400', unit: 'g', category: 'meat' },
                { name: '배', amount: '1/4', unit: '개', category: 'vegetables' },
                { name: '양파', amount: '1', unit: '개', category: 'vegetables' },
                { name: '간장', amount: '4', unit: '큰술', category: 'seasoning' },
                { name: '설탕', amount: '2', unit: '큰술', category: 'seasoning' },
                { name: '참기름', amount: '1', unit: '큰술', category: 'seasoning' }
            ],
            steps: [
                { text: '배는 강판에 갈고, 양파 반개도 갈아서 즙을 낸다.' },
                { text: '간장, 설탕, 다진 마늘, 참기름, 배즙을 섞어 양념장을 만든다.' },
                { text: '소고기에 양념장을 넣고 30분 이상 재운다.' },
                { text: '달군 팬에 양념한 고기와 채소를 넣고 센불에서 볶는다.' },
                { text: '고기가 익으면 접시에 담아낸다.' }
            ],
            tags: ['손님상', '저녁', '달콤'],
            famousRestaurants: [
                { name: '우래옥', location: '서울 중구', searchKeyword: '우래옥 불고기' },
                { name: '미성옥', location: '서울 종로구', searchKeyword: '미성옥 서울' },
                { name: '한일관', location: '서울 중구', searchKeyword: '한일관 불고기' }
            ]
        },
        {
            title: '제육볶음',
            description: '매콤달콤한 고추장 양념에 볶은 돼지고기 요리',
            category: 'korean',
            subcategory: '볶음/구이',
            difficulty: 'easy',
            prepTime: 15,
            cookTime: 15,
            servings: 2,
            image: 'https://images.unsplash.com/photo-1495195134817-aeb325a55b65?w=800',
            isVerified: false,
            imageVerified: false,
            ingredients: [
                { name: '돼지고기 앞다리살', amount: '300', unit: 'g', category: 'meat' },
                { name: '양파', amount: '1', unit: '개', category: 'vegetables' },
                { name: '고추장', amount: '2', unit: '큰술', category: 'seasoning' },
                { name: '고춧가루', amount: '1', unit: '큰술', category: 'seasoning' },
                { name: '간장', amount: '1', unit: '큰술', category: 'seasoning' },
                { name: '설탕', amount: '1', unit: '큰술', category: 'seasoning' }
            ],
            steps: [
                { text: '돼지고기는 먹기 좋게 썰고 양파도 채썬다.' },
                { text: '고추장, 고춧가루, 간장, 설탕, 다진 마늘을 섞어 양념을 만든다.' },
                { text: '고기에 양념을 넣고 10분간 재운다.' },
                { text: '달군 팬에 양파를 먼저 볶다가 고기를 넣는다.' },
                { text: '센불에서 빠르게 볶아 완성한다.' }
            ],
            tags: ['매운', '저녁', '도시락'],
            famousRestaurants: [
                { name: '영동제육', location: '서울 서초구', searchKeyword: '영동제육' },
                { name: '매운제육 이층집', location: '서울 마포구', searchKeyword: '마포 제육볶음' }
            ]
        },
        {
            title: '오징어볶음',
            description: '쫄깃한 오징어와 채소를 매콤하게 볶은 요리',
            category: 'korean',
            subcategory: '볶음/구이',
            difficulty: 'easy',
            prepTime: 15,
            cookTime: 10,
            servings: 2,
            image: 'https://images.unsplash.com/photo-1495195134817-aeb325a55b65?w=800',
            isVerified: false,
            imageVerified: false,
            ingredients: [
                { name: '오징어', amount: '2', unit: '마리', category: 'seafood' },
                { name: '양배추', amount: '1/4', unit: '통', category: 'vegetables' },
                { name: '양파', amount: '1', unit: '개', category: 'vegetables' },
                { name: '고추장', amount: '2', unit: '큰술', category: 'seasoning' },
                { name: '고춧가루', amount: '1', unit: '큰술', category: 'seasoning' }
            ],
            steps: [
                { text: '오징어는 손질해서 칼집을 넣고 한입 크기로 썬다.' },
                { text: '양배추, 양파는 먹기 좋게 썬다.' },
                { text: '양념장을 만들어 오징어에 버무린다.' },
                { text: '팬에 채소를 먼저 볶다가 오징어를 넣는다.' },
                { text: '센불에서 1-2분 빠르게 볶아 완성한다.' }
            ],
            tags: ['매운', '해물', '반찬']
        },
        {
            title: '삼겹살 구이',
            description: '두툼한 삼겹살을 노릇하게 구워 쌈과 함께 즐기는 요리',
            category: 'korean',
            subcategory: '볶음/구이',
            difficulty: 'easy',
            prepTime: 5,
            cookTime: 20,
            servings: 2,
            image: 'https://images.unsplash.com/photo-1495195134817-aeb325a55b65?w=800',
            isVerified: false,
            imageVerified: false,
            ingredients: [
                { name: '삼겹살', amount: '400', unit: 'g', category: 'meat' },
                { name: '상추', amount: '1', unit: '봉지', category: 'vegetables' },
                { name: '깻잎', amount: '10', unit: '장', category: 'vegetables' },
                { name: '쌈장', amount: '3', unit: '큰술', category: 'seasoning' },
                { name: '마늘', amount: '5', unit: '쪽', category: 'vegetables' }
            ],
            steps: [
                { text: '삼겹살은 1cm 두께로 썬다.' },
                { text: '달군 팬에 삼겹살을 올려 앞뒤로 노릇하게 굽는다.' },
                { text: '기름이 많이 나오면 키친타올로 닦아낸다.' },
                { text: '먹기 좋게 잘라 상추, 쌈장과 함께 낸다.' }
            ],
            tags: ['고기', '저녁', '손님상'],
            famousRestaurants: [
                { name: '백년토종', location: '서울 종로구', searchKeyword: '종로 삼겹살' },
                { name: '하남돼지집', location: '서울 성동구', searchKeyword: '하남돼지집' },
                { name: '고기집 팔백집', location: '서울 마포구', searchKeyword: '마포 삼겹살 맛집' }
            ]
        },
        {
            title: '비빔밥',
            description: '다양한 나물과 고추장을 넣어 비벼 먹는 한국의 대표 밥 요리',
            category: 'korean',
            subcategory: '밥/면',
            difficulty: 'medium',
            prepTime: 40,
            cookTime: 20,
            servings: 2,
            image: 'https://images.unsplash.com/photo-1495195134817-aeb325a55b65?w=800',
            isVerified: false,
            imageVerified: false,
            ingredients: [
                { name: '밥', amount: '2', unit: '공기', category: 'grain' },
                { name: '시금치', amount: '100', unit: 'g', category: 'vegetables' },
                { name: '콩나물', amount: '100', unit: 'g', category: 'vegetables' },
                { name: '당근', amount: '1/2', unit: '개', category: 'vegetables' },
                { name: '소고기 다짐육', amount: '100', unit: 'g', category: 'meat' },
                { name: '계란', amount: '2', unit: '개', category: 'dairy' },
                { name: '고추장', amount: '2', unit: '큰술', category: 'seasoning' }
            ],
            steps: [
                { text: '시금치와 콩나물은 각각 데쳐서 참기름, 소금으로 무친다.' },
                { text: '당근은 채썰어 볶아 소금으로 간한다.' },
                { text: '소고기는 간장, 설탕으로 양념해 볶는다.' },
                { text: '계란은 프라이로 만든다.' },
                { text: '그릇에 밥을 담고 나물과 고기를 색색이 올린다.' },
                { text: '계란 프라이를 올리고 고추장과 함께 비벼 먹는다.' }
            ],
            tags: ['건강', '점심', '일품요리'],
            famousRestaurants: [
                { name: '전주중앙회관', location: '서울 종로구', searchKeyword: '전주중앙회관 비빔밥' },
                { name: '고궁', location: '서울 중구', searchKeyword: '고궁 비빔밥' },
                { name: '한국집', location: '전주시', searchKeyword: '전주 비빔밥 한국집' }
            ]
        },
        {
            title: '잡채',
            description: '당면과 다양한 채소, 고기를 달콤하게 볶아낸 명절 음식',
            category: 'korean',
            subcategory: '밥/면',
            difficulty: 'medium',
            prepTime: 30,
            cookTime: 25,
            servings: 4,
            image: 'https://images.unsplash.com/photo-1495195134817-aeb325a55b65?w=800',
            isVerified: false,
            imageVerified: false,
            ingredients: [
                { name: '당면', amount: '200', unit: 'g', category: 'grain' },
                { name: '소고기 채끝', amount: '100', unit: 'g', category: 'meat' },
                { name: '시금치', amount: '100', unit: 'g', category: 'vegetables' },
                { name: '당근', amount: '1/2', unit: '개', category: 'vegetables' },
                { name: '표고버섯', amount: '3', unit: '개', category: 'vegetables' },
                { name: '간장', amount: '3', unit: '큰술', category: 'seasoning' },
                { name: '설탕', amount: '2', unit: '큰술', category: 'seasoning' }
            ],
            steps: [
                { text: '당면은 끓는 물에 7분간 삶아 찬물에 헹군다.' },
                { text: '시금치는 데쳐서 참기름, 소금으로 무친다.' },
                { text: '당근, 표고버섯은 채썰어 각각 볶는다.' },
                { text: '소고기는 채썰어 간장, 설탕으로 양념해 볶는다.' },
                { text: '큰 볼에 당면, 모든 채소, 고기를 넣고 버무린다.' },
                { text: '통깨를 뿌려 완성한다.' }
            ],
            tags: ['손님상', '명절', '반찬']
        },
        {
            title: '김치볶음밥',
            description: '잘 익은 김치와 밥을 고소하게 볶은 간단 요리',
            category: 'korean',
            subcategory: '밥/면',
            difficulty: 'easy',
            prepTime: 5,
            cookTime: 10,
            servings: 1,
            image: 'https://images.unsplash.com/photo-1495195134817-aeb325a55b65?w=800',
            isVerified: false,
            imageVerified: false,
            ingredients: [
                { name: '찬밥', amount: '1', unit: '공기', category: 'grain' },
                { name: '김치', amount: '1/2', unit: '컵', category: 'vegetables' },
                { name: '돼지고기 또는 스팸', amount: '50', unit: 'g', category: 'meat' },
                { name: '계란', amount: '1', unit: '개', category: 'dairy' },
                { name: '참기름', amount: '1', unit: '작은술', category: 'seasoning' }
            ],
            steps: [
                { text: '김치는 송송 썰고 고기도 작게 썬다.' },
                { text: '팬에 고기를 먼저 볶는다.' },
                { text: '김치를 넣고 함께 볶는다.' },
                { text: '밥을 넣고 센불에서 볶는다.' },
                { text: '참기름을 두르고 계란 프라이를 올려 완성한다.' }
            ],
            tags: ['간단', '야식', '일품요리']
        },
        {
            title: '계란말이',
            description: '부드럽고 폭신한 한국식 계란말이',
            category: 'korean',
            subcategory: '반찬',
            difficulty: 'medium',
            prepTime: 5,
            cookTime: 10,
            servings: 2,
            image: 'https://images.unsplash.com/photo-1495195134817-aeb325a55b65?w=800',
            isVerified: false,
            imageVerified: false,
            ingredients: [
                { name: '계란', amount: '4', unit: '개', category: 'dairy' },
                { name: '대파', amount: '1/2', unit: '대', category: 'vegetables' },
                { name: '당근', amount: '1/4', unit: '개', category: 'vegetables' },
                { name: '소금', amount: '1/4', unit: '작은술', category: 'seasoning' }
            ],
            steps: [
                { text: '대파와 당근은 잘게 다진다.' },
                { text: '계란을 풀고 소금, 물 2큰술, 채소를 넣어 섞는다.' },
                { text: '팬에 기름을 두르고 약불로 줄인다.' },
                { text: '계란물의 1/3을 얇게 붓고 반쯤 익으면 돌돌 말아 한쪽으로 민다.' },
                { text: '나머지도 나눠서 같은 방식으로 말아준다.' },
                { text: '완전히 익으면 먹기 좋게 썬다.' }
            ],
            tags: ['반찬', '도시락', '간단']
        },
        {
            title: '감자전',
            description: '바삭하고 고소한 감자전',
            category: 'korean',
            subcategory: '반찬',
            difficulty: 'easy',
            prepTime: 15,
            cookTime: 15,
            servings: 2,
            image: 'https://images.unsplash.com/photo-1495195134817-aeb325a55b65?w=800',
            isVerified: false,
            imageVerified: false,
            ingredients: [
                { name: '감자', amount: '3', unit: '개', category: 'vegetables' },
                { name: '양파', amount: '1/4', unit: '개', category: 'vegetables' },
                { name: '소금', amount: '1/2', unit: '작은술', category: 'seasoning' },
                { name: '식용유', amount: '3', unit: '큰술', category: 'seasoning' }
            ],
            steps: [
                { text: '감자는 껍질을 벗기고 강판에 곱게 간다.' },
                { text: '양파도 갈거나 잘게 다진다.' },
                { text: '감자의 물기를 살짝 짜고 전분은 남겨둔다.' },
                { text: '감자, 양파, 소금을 섞는다.' },
                { text: '팬에 기름을 넉넉히 두르고 반죽을 얇게 펴 굽는다.' },
                { text: '앞뒤로 노릇하게 구워 간장과 함께 낸다.' }
            ],
            tags: ['반찬', '간단', '야식']
        },
        {
            title: '멸치볶음',
            description: '고소하고 달콤짭짤한 밑반찬',
            category: 'korean',
            subcategory: '반찬',
            difficulty: 'easy',
            prepTime: 5,
            cookTime: 10,
            servings: 4,
            image: 'https://images.unsplash.com/photo-1495195134817-aeb325a55b65?w=800',
            isVerified: false,
            imageVerified: false,
            ingredients: [
                { name: '멸치(중간 크기)', amount: '100', unit: 'g', category: 'seafood' },
                { name: '간장', amount: '1', unit: '큰술', category: 'seasoning' },
                { name: '올리고당', amount: '2', unit: '큰술', category: 'seasoning' },
                { name: '통깨', amount: '1', unit: '큰술', category: 'seasoning' },
                { name: '식용유', amount: '1', unit: '큰술', category: 'seasoning' }
            ],
            steps: [
                { text: '멸치는 머리와 내장을 제거한다 (선택).' },
                { text: '마른 팬에 멸치를 약불에서 볶아 비린내를 제거한다.' },
                { text: '간장과 올리고당을 넣고 골고루 볶는다.' },
                { text: '윤기가 나면 불을 끄고 통깨를 뿌린다.' }
            ],
            tags: ['반찬', '간단', '도시락']
        },
        {
            title: '짜장면',
            description: '춘장과 다진 돼지고기, 채소를 볶아 면에 비벼 먹는 중화 요리',
            category: 'chinese',
            subcategory: '면/밥',
            difficulty: 'medium',
            prepTime: 20,
            cookTime: 20,
            servings: 2,
            image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=800',
            isVerified: false,
            imageVerified: true,
            ingredients: [
                { name: '중화면', amount: '200', unit: 'g', category: 'grain' },
                { name: '돼지고기 다짐육', amount: '150', unit: 'g', category: 'meat' },
                { name: '춘장', amount: '3', unit: '큰술', category: 'seasoning' },
                { name: '양파', amount: '1', unit: '개', category: 'vegetables' },
                { name: '감자', amount: '1', unit: '개', category: 'vegetables' },
                { name: '애호박', amount: '1/2', unit: '개', category: 'vegetables' }
            ],
            steps: [
                { text: '양파, 감자, 애호박은 1cm 크기로 깍둑썬다.' },
                { text: '팬에 식용유를 넉넉히 두르고 춘장을 중불에서 3분간 볶는다.' },
                { text: '다진 고기를 넣고 익을 때까지 볶는다.' },
                { text: '감자를 먼저 넣고 2분 볶은 뒤 양파, 애호박을 넣는다.' },
                { text: '물과 설탕을 넣고 감자가 익을 때까지 10분간 끓인다.' },
                { text: '삶은 면에 소스를 올려 비벼 먹는다.' }
            ],
            tags: ['점심', '면', '간단'],
            famousRestaurants: [
                { name: '공화춘', location: '인천 중구', searchKeyword: '공화춘 짜장면 인천' },
                { name: '홍콩반점0410', location: '서울 전역', searchKeyword: '홍콩반점0410' },
                { name: '미성반점', location: '서울 강남구', searchKeyword: '미성반점 강남' }
            ]
        },
        {
            title: '짬뽕',
            description: '매콤한 해물 국물이 일품인 중화 면요리',
            category: 'chinese',
            subcategory: '면/밥',
            difficulty: 'medium',
            prepTime: 20,
            cookTime: 20,
            servings: 2,
            image: 'https://images.unsplash.com/photo-1495195134817-aeb325a55b65?w=800',
            isVerified: false,
            imageVerified: false,
            ingredients: [
                { name: '중화면', amount: '200', unit: 'g', category: 'grain' },
                { name: '해물믹스', amount: '200', unit: 'g', category: 'seafood' },
                { name: '양파', amount: '1', unit: '개', category: 'vegetables' },
                { name: '양배추', amount: '2', unit: '장', category: 'vegetables' },
                { name: '고춧가루', amount: '2', unit: '큰술', category: 'seasoning' },
                { name: '고추기름', amount: '2', unit: '큰술', category: 'seasoning' }
            ],
            steps: [
                { text: '채소는 먹기 좋게 썬다.' },
                { text: '팬에 고추기름을 두르고 고춧가루를 볶아 매운 기름을 만든다.' },
                { text: '해물과 채소를 넣고 센불에서 볶는다.' },
                { text: '물 또는 육수를 붓고 끓인다.' },
                { text: '삶은 면을 그릇에 담고 국물을 부어 완성한다.' }
            ],
            tags: ['매운', '면', '해물'],
            famousRestaurants: [
                { name: '만리장성', location: '서울 중구', searchKeyword: '만리장성 짬뽕' },
                { name: '홍보석', location: '서울 서대문구', searchKeyword: '홍보석 짬뽕' },
                { name: '진진', location: '서울 마포구', searchKeyword: '진진 중국집' }
            ]
        },
        {
            title: '탕수육',
            description: '바삭하게 튀긴 돼지고기에 새콤달콤한 소스를 곁들인 중화 요리',
            category: 'chinese',
            subcategory: '튀김',
            difficulty: 'hard',
            prepTime: 30,
            cookTime: 30,
            servings: 3,
            image: 'https://images.unsplash.com/photo-1525755662778-989d0524087e?w=800',
            isVerified: false,
            imageVerified: true,
            ingredients: [
                { name: '돼지고기 안심', amount: '300', unit: 'g', category: 'meat' },
                { name: '전분', amount: '1', unit: '컵', category: 'grain' },
                { name: '계란', amount: '1', unit: '개', category: 'dairy' },
                { name: '오이', amount: '1/2', unit: '개', category: 'vegetables' },
                { name: '식초', amount: '3', unit: '큰술', category: 'seasoning' },
                { name: '설탕', amount: '4', unit: '큰술', category: 'seasoning' },
                { name: '케첩', amount: '2', unit: '큰술', category: 'seasoning' }
            ],
            steps: [
                { text: '돼지고기는 한입 크기로 썰어 소금, 후추로 밑간한다.' },
                { text: '계란과 전분을 섞어 반죽을 만들고 고기에 입힌다.' },
                { text: '170도 기름에 고기를 5분간 튀기고 건져낸다.' },
                { text: '180도로 올려 2차로 바삭하게 튀긴다.' },
                { text: '팬에 물, 식초, 설탕, 케첩을 넣고 끓인다.' },
                { text: '전분물로 걸쭉하게 만들어 튀긴 고기에 뿌린다.' }
            ],
            tags: ['손님상', '튀김', '달콤'],
            famousRestaurants: [
                { name: '청기와', location: '서울 종로구', searchKeyword: '청기와 탕수육' },
                { name: '태원', location: '서울 중구', searchKeyword: '태원 탕수육 명동' },
                { name: '홍콩반점', location: '서울 전역', searchKeyword: '홍콩반점 탕수육' }
            ]
        },
        {
            title: '볶음밥',
            description: '남은 밥과 재료로 간단히 만드는 고소한 중화식 볶음밥',
            category: 'chinese',
            subcategory: '면/밥',
            difficulty: 'easy',
            prepTime: 10,
            cookTime: 10,
            servings: 1,
            image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800',
            isVerified: false,
            imageVerified: true,
            ingredients: [
                { name: '찬밥', amount: '1', unit: '공기', category: 'grain' },
                { name: '계란', amount: '2', unit: '개', category: 'dairy' },
                { name: '대파', amount: '1/2', unit: '대', category: 'vegetables' },
                { name: '햄 또는 베이컨', amount: '50', unit: 'g', category: 'meat' },
                { name: '간장', amount: '1', unit: '큰술', category: 'seasoning' }
            ],
            steps: [
                { text: '대파, 햄은 잘게 다진다.' },
                { text: '달군 팬에 기름을 두르고 계란을 스크램블한 뒤 덜어둔다.' },
                { text: '같은 팬에 햄을 볶는다.' },
                { text: '찬밥을 넣고 센불에서 볶는다.' },
                { text: '간장을 넣고 스크램블 계란, 대파를 넣어 완성한다.' }
            ],
            tags: ['간단', '점심', '야식']
        },
        {
            title: '마파두부',
            description: '얼얼하고 매콤한 사천식 두부 요리',
            category: 'chinese',
            subcategory: '볶음',
            difficulty: 'medium',
            prepTime: 10,
            cookTime: 15,
            servings: 2,
            image: 'https://images.unsplash.com/photo-1495195134817-aeb325a55b65?w=800',
            isVerified: false,
            imageVerified: false,
            ingredients: [
                { name: '두부', amount: '1', unit: '모', category: 'other' },
                { name: '돼지고기 다짐육', amount: '100', unit: 'g', category: 'meat' },
                { name: '두반장', amount: '1', unit: '큰술', category: 'seasoning' },
                { name: '고추기름', amount: '1', unit: '큰술', category: 'seasoning' },
                { name: '대파', amount: '1', unit: '대', category: 'vegetables' },
                { name: '화자오(산초)', amount: '1/2', unit: '작은술', category: 'seasoning' }
            ],
            steps: [
                { text: '두부는 2cm 크기로 깍둑썰기하고 끓는 물에 데친다.' },
                { text: '팬에 고추기름을 두르고 다짐육을 볶는다.' },
                { text: '두반장을 넣고 볶아 향을 낸다.' },
                { text: '물을 넣고 두부를 넣어 5분간 끓인다.' },
                { text: '전분물로 농도를 맞추고 화자오를 뿌린다.' },
                { text: '대파를 올려 완성한다.' }
            ],
            tags: ['매운', '저녁', '반찬']
        },
        {
            title: '돈카츠',
            description: '두툼한 돼지고기에 빵가루를 입혀 바삭하게 튀긴 일본식 커틀릿',
            category: 'japanese',
            subcategory: '튀김',
            difficulty: 'medium',
            prepTime: 20,
            cookTime: 15,
            servings: 2,
            image: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=800',
            isVerified: false,
            imageVerified: false,
            ingredients: [
                { name: '돼지고기 등심', amount: '2', unit: '장', category: 'meat' },
                { name: '밀가루', amount: '1/2', unit: '컵', category: 'grain' },
                { name: '계란', amount: '2', unit: '개', category: 'dairy' },
                { name: '빵가루', amount: '1', unit: '컵', category: 'grain' },
                { name: '양배추', amount: '1/4', unit: '통', category: 'vegetables' },
                { name: '돈카츠 소스', amount: '적당량', unit: '', category: 'seasoning' }
            ],
            steps: [
                { text: '돼지고기는 힘줄을 끊고 소금, 후추로 밑간한다.' },
                { text: '밀가루, 계란물, 빵가루 순으로 튀김옷을 입힌다.' },
                { text: '170도 기름에서 5-6분간 노릇하게 튀긴다.' },
                { text: '기름을 빼고 먹기 좋게 썬다.' },
                { text: '양배추는 곱게 채썬다.' },
                { text: '접시에 양배추와 돈카츠를 담고 소스를 곁들인다.' }
            ],
            tags: ['튀김', '저녁', '손님상'],
            famousRestaurants: [
                { name: '긴자카쓰', location: '서울 강남구', searchKeyword: '긴자카쓰 돈카츠' },
                { name: '사보텐', location: '서울 전역', searchKeyword: '사보텐 돈카츠' },
                { name: '마이센', location: '서울 강남구', searchKeyword: '마이센 돈카츠' }
            ]
        },
        {
            title: '오야코동',
            description: '닭고기와 계란을 달콤한 다시 국물에 익혀 밥 위에 올린 덮밥',
            category: 'japanese',
            subcategory: '덮밥',
            difficulty: 'easy',
            prepTime: 10,
            cookTime: 15,
            servings: 1,
            image: 'https://images.unsplash.com/photo-1553621042-f6e147245754?w=800',
            isVerified: false,
            imageVerified: true,
            ingredients: [
                { name: '밥', amount: '1', unit: '공기', category: 'grain' },
                { name: '닭다리살', amount: '100', unit: 'g', category: 'meat' },
                { name: '계란', amount: '2', unit: '개', category: 'dairy' },
                { name: '양파', amount: '1/4', unit: '개', category: 'vegetables' },
                { name: '간장', amount: '2', unit: '큰술', category: 'seasoning' },
                { name: '미림', amount: '1', unit: '큰술', category: 'seasoning' },
                { name: '다시물', amount: '100', unit: 'ml', category: 'other' }
            ],
            steps: [
                { text: '닭다리살은 한입 크기로 썰고, 양파는 채썬다.' },
                { text: '작은 팬에 다시물, 간장, 미림, 설탕을 넣고 끓인다.' },
                { text: '양파와 닭고기를 넣고 중불에서 5분간 익힌다.' },
                { text: '계란을 가볍게 풀어 팬에 돌려 붓는다.' },
                { text: '계란이 반숙이 되면 불을 끈다.' },
                { text: '밥 위에 올리고 대파를 뿌려 완성한다.' }
            ],
            tags: ['간단', '점심', '일품요리'],
            famousRestaurants: [
                { name: '오야코동 전문점', location: '서울 종로구', searchKeyword: '종로 오야코동' },
                { name: '마루', location: '서울 강남구', searchKeyword: '강남 일식 덮밥' }
            ]
        },
        {
            title: '일본식 카레라이스',
            description: '진하고 달콤한 일본식 카레를 밥과 함께 즐기는 국민 음식',
            category: 'japanese',
            subcategory: '덮밥',
            difficulty: 'easy',
            prepTime: 15,
            cookTime: 40,
            servings: 4,
            image: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=800',
            isVerified: false,
            imageVerified: true,
            ingredients: [
                { name: '돼지고기 또는 소고기', amount: '200', unit: 'g', category: 'meat' },
                { name: '감자', amount: '2', unit: '개', category: 'vegetables' },
                { name: '당근', amount: '1', unit: '개', category: 'vegetables' },
                { name: '양파', amount: '1', unit: '개', category: 'vegetables' },
                { name: '카레 루', amount: '1/2', unit: '박스', category: 'seasoning' },
                { name: '밥', amount: '4', unit: '공기', category: 'grain' }
            ],
            steps: [
                { text: '감자, 당근, 양파는 큼직하게 깍둑썬다.' },
                { text: '고기는 한입 크기로 썬다.' },
                { text: '냄비에 기름을 두르고 고기를 먼저 볶는다.' },
                { text: '양파를 넣고 투명해질 때까지 볶는다.' },
                { text: '감자, 당근을 넣고 물을 부어 20분간 끓인다.' },
                { text: '불을 끄고 카레 루를 넣어 녹인 뒤 10분간 더 끓인다.' }
            ],
            tags: ['간단', '저녁', '일품요리'],
            famousRestaurants: [
                { name: '코코이치방야', location: '서울 전역', searchKeyword: '코코이치방야 카레' },
                { name: '커리야', location: '서울 강남구', searchKeyword: '커리야 강남' },
                { name: '고든카레', location: '서울 마포구', searchKeyword: '고든카레' }
            ]
        },
        {
            title: '우동',
            description: '따뜻한 가쓰오 육수에 쫄깃한 우동면을 담은 일본 면요리',
            category: 'japanese',
            subcategory: '면',
            difficulty: 'easy',
            prepTime: 10,
            cookTime: 15,
            servings: 2,
            image: 'https://images.unsplash.com/photo-1495195134817-aeb325a55b65?w=800',
            isVerified: false,
            imageVerified: false,
            ingredients: [
                { name: '우동면', amount: '2', unit: '인분', category: 'grain' },
                { name: '가쓰오부시', amount: '10', unit: 'g', category: 'seafood' },
                { name: '간장', amount: '3', unit: '큰술', category: 'seasoning' },
                { name: '미림', amount: '2', unit: '큰술', category: 'seasoning' },
                { name: '대파', amount: '1', unit: '대', category: 'vegetables' },
                { name: '어묵', amount: '2', unit: '개', category: 'seafood' }
            ],
            steps: [
                { text: '물 600ml를 끓여 가쓰오부시를 넣고 5분간 우린다.' },
                { text: '체에 걸러 육수를 만든다.' },
                { text: '육수에 간장, 미림을 넣어 간을 맞춘다.' },
                { text: '우동면을 삶아 그릇에 담는다.' },
                { text: '뜨거운 육수를 붓고 어묵, 대파를 올린다.' }
            ],
            tags: ['간단', '국물', '면']
        },
        {
            title: '규동 (소고기덮밥)',
            description: '달콤짭짤하게 조린 소고기를 밥 위에 올린 일본식 덮밥',
            category: 'japanese',
            subcategory: '덮밥',
            difficulty: 'easy',
            prepTime: 10,
            cookTime: 15,
            servings: 2,
            image: 'https://images.unsplash.com/photo-1495195134817-aeb325a55b65?w=800',
            isVerified: false,
            imageVerified: false,
            ingredients: [
                { name: '밥', amount: '2', unit: '공기', category: 'grain' },
                { name: '소고기 불고기용', amount: '200', unit: 'g', category: 'meat' },
                { name: '양파', amount: '1', unit: '개', category: 'vegetables' },
                { name: '간장', amount: '3', unit: '큰술', category: 'seasoning' },
                { name: '미림', amount: '2', unit: '큰술', category: 'seasoning' },
                { name: '설탕', amount: '1', unit: '큰술', category: 'seasoning' }
            ],
            steps: [
                { text: '양파는 얇게 채썬다.' },
                { text: '팬에 물 100ml, 간장, 미림, 설탕을 넣고 끓인다.' },
                { text: '양파를 넣고 중불에서 5분간 익힌다.' },
                { text: '소고기를 넣고 익힌다.' },
                { text: '밥 위에 올려 완성한다.' }
            ],
            tags: ['간단', '점심', '일품요리']
        },
        {
            title: '크림 파스타',
            description: '부드러운 크림 소스에 버무린 고소한 파스타',
            category: 'western',
            subcategory: '파스타',
            difficulty: 'easy',
            prepTime: 10,
            cookTime: 20,
            servings: 2,
            image: 'https://images.unsplash.com/photo-1645112411341-6c4fd023714a?w=800',
            isVerified: false,
            imageVerified: false,
            ingredients: [
                { name: '스파게티면', amount: '200', unit: 'g', category: 'grain' },
                { name: '베이컨', amount: '100', unit: 'g', category: 'meat' },
                { name: '양파', amount: '1/2', unit: '개', category: 'vegetables' },
                { name: '생크림', amount: '200', unit: 'ml', category: 'dairy' },
                { name: '파마산 치즈', amount: '30', unit: 'g', category: 'dairy' },
                { name: '버터', amount: '20', unit: 'g', category: 'dairy' }
            ],
            steps: [
                { text: '끓는 물에 소금을 넣고 스파게티를 알덴테로 삶는다.' },
                { text: '베이컨은 1cm 폭으로 썰고, 양파와 마늘은 다진다.' },
                { text: '팬에 버터를 녹이고 마늘을 볶아 향을 낸다.' },
                { text: '베이컨과 양파를 넣고 볶는다.' },
                { text: '생크림을 넣고 약불에서 3분간 끓인다.' },
                { text: '삶은 면과 면수를 넣고 버무려 완성한다.' }
            ],
            tags: ['간단', '저녁', '면'],
            famousRestaurants: [
                { name: '오스테리아 오르초', location: '서울 용산구', searchKeyword: '오스테리아 오르초 파스타' },
                { name: '라쿠치나', location: '서울 강남구', searchKeyword: '라쿠치나 파스타' },
                { name: '봉주르 파스타', location: '서울 마포구', searchKeyword: '봉주르 파스타' }
            ]
        },
        {
            title: '토마토 미트소스 파스타',
            description: '풍성한 고기와 토마토 소스가 어우러진 클래식 파스타',
            category: 'western',
            subcategory: '파스타',
            difficulty: 'medium',
            prepTime: 15,
            cookTime: 30,
            servings: 2,
            image: 'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=800',
            isVerified: false,
            imageVerified: true,
            ingredients: [
                { name: '스파게티면', amount: '200', unit: 'g', category: 'grain' },
                { name: '소고기 다짐육', amount: '200', unit: 'g', category: 'meat' },
                { name: '토마토 홀 캔', amount: '1', unit: '캔', category: 'vegetables' },
                { name: '양파', amount: '1', unit: '개', category: 'vegetables' },
                { name: '올리브 오일', amount: '2', unit: '큰술', category: 'seasoning' },
                { name: '바질', amount: '조금', unit: '', category: 'vegetables' }
            ],
            steps: [
                { text: '양파와 마늘은 다진다.' },
                { text: '팬에 올리브 오일을 두르고 마늘을 볶아 향을 낸다.' },
                { text: '양파를 넣고 투명해질 때까지 볶는다.' },
                { text: '다짐육을 넣고 익을 때까지 볶으며 덩어리를 풀어준다.' },
                { text: '토마토 홀을 넣고 으깨면서 20분간 끓인다.' },
                { text: '삶은 면을 넣어 버무리고 바질을 올린다.' }
            ],
            tags: ['저녁', '면', '일품요리'],
            famousRestaurants: [
                { name: '쏠레미오', location: '서울 강남구', searchKeyword: '쏠레미오 파스타' },
                { name: '매드포갈릭', location: '서울 전역', searchKeyword: '매드포갈릭 파스타' }
            ]
        },
        {
            title: '스테이크',
            description: '겉은 바삭하고 속은 촉촉한 완벽한 스테이크',
            category: 'western',
            subcategory: '스테이크',
            difficulty: 'medium',
            prepTime: 10,
            cookTime: 15,
            servings: 1,
            image: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?w=800',
            isVerified: false,
            imageVerified: false,
            ingredients: [
                { name: '소고기 스테이크용', amount: '250', unit: 'g', category: 'meat' },
                { name: '버터', amount: '30', unit: 'g', category: 'dairy' },
                { name: '마늘', amount: '2', unit: '쪽', category: 'vegetables' },
                { name: '로즈마리', amount: '1', unit: '줄기', category: 'vegetables' },
                { name: '올리브 오일', amount: '1', unit: '큰술', category: 'seasoning' },
                { name: '소금, 후추', amount: '적당량', unit: '', category: 'seasoning' }
            ],
            steps: [
                { text: '고기는 조리 30분 전에 냉장고에서 꺼내 실온에 둔다.' },
                { text: '키친타올로 고기 표면의 물기를 닦는다.' },
                { text: '소금과 후추를 양면에 충분히 뿌린다.' },
                { text: '팬을 강불로 충분히 달군 뒤 올리브 오일을 두른다.' },
                { text: '고기를 올리고 2분간 굽고 뒤집어 2분 더 굽는다.' },
                { text: '버터, 마늘, 로즈마리를 넣고 버터를 끼얹으며 굽는다.' },
                { text: '호일에 싸서 5분간 레스팅 후 서빙한다.' }
            ],
            tags: ['손님상', '저녁', '고급'],
            famousRestaurants: [
                { name: '울프강스테이크하우스', location: '서울 중구', searchKeyword: '울프강스테이크하우스' },
                { name: '아웃백스테이크하우스', location: '서울 전역', searchKeyword: '아웃백스테이크하우스' },
                { name: '정', location: '서울 강남구', searchKeyword: '정 스테이크 강남' }
            ]
        },
        {
            title: '리조또',
            description: '크리미하고 고소한 이탈리안 리조또',
            category: 'western',
            subcategory: '밥',
            difficulty: 'medium',
            prepTime: 10,
            cookTime: 30,
            servings: 2,
            image: 'https://images.unsplash.com/photo-1495195134817-aeb325a55b65?w=800',
            isVerified: false,
            imageVerified: false,
            ingredients: [
                { name: '아르보리오 쌀', amount: '200', unit: 'g', category: 'grain' },
                { name: '양파', amount: '1/2', unit: '개', category: 'vegetables' },
                { name: '화이트 와인', amount: '100', unit: 'ml', category: 'other' },
                { name: '치킨 스톡', amount: '500', unit: 'ml', category: 'other' },
                { name: '파마산 치즈', amount: '50', unit: 'g', category: 'dairy' },
                { name: '버터', amount: '30', unit: 'g', category: 'dairy' }
            ],
            steps: [
                { text: '양파는 잘게 다진다.' },
                { text: '팬에 버터를 녹이고 양파를 볶는다.' },
                { text: '쌀을 넣고 2분간 볶아 코팅한다.' },
                { text: '와인을 넣고 증발시킨다.' },
                { text: '따뜻한 스톡을 조금씩 넣으며 저어준다.' },
                { text: '쌀이 익으면 파마산 치즈와 버터를 넣어 마무리한다.' }
            ],
            tags: ['저녁', '손님상', '일품요리']
        },
        {
            title: '시저 샐러드',
            description: '바삭한 크루통과 시저 드레싱이 어우러진 클래식 샐러드',
            category: 'western',
            subcategory: '샐러드',
            difficulty: 'easy',
            prepTime: 15,
            cookTime: 5,
            servings: 2,
            image: 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?w=800',
            isVerified: false,
            imageVerified: false,
            ingredients: [
                { name: '로메인 상추', amount: '1', unit: '통', category: 'vegetables' },
                { name: '식빵', amount: '2', unit: '장', category: 'grain' },
                { name: '파마산 치즈', amount: '30', unit: 'g', category: 'dairy' },
                { name: '마요네즈', amount: '3', unit: '큰술', category: 'seasoning' },
                { name: '레몬즙', amount: '1', unit: '큰술', category: 'seasoning' },
                { name: '앤초비', amount: '2', unit: '필렛', category: 'seafood' }
            ],
            steps: [
                { text: '식빵은 깍둑썰어 올리브 오일에 바삭하게 굽는다.' },
                { text: '앤초비를 다지고 마요네즈, 레몬즙, 마늘과 섞어 드레싱을 만든다.' },
                { text: '로메인은 씻어서 먹기 좋게 뜯는다.' },
                { text: '볼에 상추를 담고 드레싱을 뿌린다.' },
                { text: '크루통과 파마산 치즈를 올려 완성한다.' }
            ],
            tags: ['건강', '간단', '샐러드']
        },
        {
            title: '프렌치 토스트',
            description: '계란물에 적신 식빵을 버터에 구워낸 달콤한 아침 메뉴',
            category: 'dessert',
            subcategory: '빵',
            difficulty: 'easy',
            prepTime: 5,
            cookTime: 10,
            servings: 2,
            image: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=800',
            isVerified: false,
            imageVerified: false,
            ingredients: [
                { name: '식빵', amount: '4', unit: '장', category: 'grain' },
                { name: '계란', amount: '2', unit: '개', category: 'dairy' },
                { name: '우유', amount: '100', unit: 'ml', category: 'dairy' },
                { name: '설탕', amount: '2', unit: '큰술', category: 'seasoning' },
                { name: '버터', amount: '20', unit: 'g', category: 'dairy' },
                { name: '메이플 시럽', amount: '적당량', unit: '', category: 'seasoning' }
            ],
            steps: [
                { text: '볼에 계란, 우유, 설탕, 시나몬을 넣고 잘 섞는다.' },
                { text: '식빵을 계란물에 앞뒤로 충분히 적신다.' },
                { text: '팬에 버터를 녹이고 중약불로 줄인다.' },
                { text: '식빵을 올려 한 면당 2-3분씩 노릇하게 굽는다.' },
                { text: '메이플 시럽을 뿌려 낸다.' }
            ],
            tags: ['아침', '달콤', '간단']
        },
        {
            title: '팬케이크',
            description: '폭신하고 부드러운 미국식 팬케이크',
            category: 'dessert',
            subcategory: '빵',
            difficulty: 'easy',
            prepTime: 10,
            cookTime: 15,
            servings: 2,
            image: 'https://images.unsplash.com/photo-1484723091739-30a097e8f929?w=800',
            isVerified: false,
            imageVerified: false,
            ingredients: [
                { name: '밀가루', amount: '200', unit: 'g', category: 'grain' },
                { name: '베이킹파우더', amount: '2', unit: '작은술', category: 'seasoning' },
                { name: '설탕', amount: '2', unit: '큰술', category: 'seasoning' },
                { name: '계란', amount: '1', unit: '개', category: 'dairy' },
                { name: '우유', amount: '250', unit: 'ml', category: 'dairy' },
                { name: '버터', amount: '30', unit: 'g', category: 'dairy' }
            ],
            steps: [
                { text: '밀가루, 베이킹파우더, 설탕, 소금을 볼에 체쳐서 넣는다.' },
                { text: '다른 볼에 계란, 우유, 녹인 버터를 섞는다.' },
                { text: '건조 재료에 액체 재료를 넣고 덩어리가 약간 남을 정도로 섞는다.' },
                { text: '약불로 달군 팬에 반죽을 동그랗게 붓는다.' },
                { text: '표면에 기포가 생기면 뒤집어 2분 더 굽는다.' }
            ],
            tags: ['아침', '달콤', '간단']
        },
        {
            title: '초코 브라우니',
            description: '진하고 촉촉한 초콜릿 브라우니',
            category: 'dessert',
            subcategory: '케이크',
            difficulty: 'medium',
            prepTime: 15,
            cookTime: 25,
            servings: 9,
            image: 'https://images.unsplash.com/photo-1495195134817-aeb325a55b65?w=800',
            isVerified: false,
            imageVerified: false,
            ingredients: [
                { name: '다크 초콜릿', amount: '200', unit: 'g', category: 'other' },
                { name: '버터', amount: '150', unit: 'g', category: 'dairy' },
                { name: '설탕', amount: '200', unit: 'g', category: 'seasoning' },
                { name: '계란', amount: '3', unit: '개', category: 'dairy' },
                { name: '밀가루', amount: '100', unit: 'g', category: 'grain' },
                { name: '호두', amount: '50', unit: 'g', category: 'other' }
            ],
            steps: [
                { text: '오븐을 180도로 예열한다.' },
                { text: '초콜릿과 버터를 중탕으로 녹인다.' },
                { text: '설탕과 계란을 넣고 잘 섞는다.' },
                { text: '밀가루, 코코아 파우더를 체쳐서 넣고 섞는다.' },
                { text: '호두를 넣고 베이킹 팬에 반죽을 붓는다.' },
                { text: '180도에서 25분간 굽는다.' }
            ],
            tags: ['달콤', '디저트', '베이킹']
        },
        {
            title: '과일 요거트 볼',
            description: '신선한 과일과 그래놀라를 올린 건강한 디저트',
            category: 'dessert',
            subcategory: '과일',
            difficulty: 'easy',
            prepTime: 10,
            cookTime: 0,
            servings: 1,
            image: 'https://images.unsplash.com/photo-1495195134817-aeb325a55b65?w=800',
            isVerified: false,
            imageVerified: false,
            ingredients: [
                { name: '그릭 요거트', amount: '200', unit: 'g', category: 'dairy' },
                { name: '딸기', amount: '5', unit: '개', category: 'vegetables' },
                { name: '블루베리', amount: '1/4', unit: '컵', category: 'vegetables' },
                { name: '바나나', amount: '1/2', unit: '개', category: 'vegetables' },
                { name: '그래놀라', amount: '1/4', unit: '컵', category: 'grain' },
                { name: '꿀', amount: '1', unit: '큰술', category: 'seasoning' }
            ],
            steps: [
                { text: '과일은 씻어서 먹기 좋게 썬다.' },
                { text: '볼에 요거트를 담는다.' },
                { text: '과일을 예쁘게 올린다.' },
                { text: '그래놀라를 뿌린다.' },
                { text: '꿀을 뿌려 완성한다.' }
            ],
            tags: ['건강', '아침', '간단']
        },
        {
            title: '딸기 스무디',
            description: '신선한 딸기와 요거트로 만든 상큼한 스무디',
            category: 'drink',
            subcategory: '스무디',
            difficulty: 'easy',
            prepTime: 5,
            cookTime: 0,
            servings: 2,
            image: 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=800',
            isVerified: false,
            imageVerified: false,
            ingredients: [
                { name: '딸기', amount: '200', unit: 'g', category: 'vegetables' },
                { name: '플레인 요거트', amount: '150', unit: 'g', category: 'dairy' },
                { name: '우유', amount: '100', unit: 'ml', category: 'dairy' },
                { name: '꿀', amount: '1', unit: '큰술', category: 'seasoning' },
                { name: '얼음', amount: '5', unit: '개', category: 'other' }
            ],
            steps: [
                { text: '딸기는 씻어서 꼭지를 제거한다.' },
                { text: '블렌더에 딸기, 요거트, 우유, 꿀을 넣는다.' },
                { text: '얼음을 넣고 부드러워질 때까지 갈아준다.' },
                { text: '잔에 담아 바로 마신다.' }
            ],
            tags: ['음료', '건강', '간단']
        },
        {
            title: '레몬에이드',
            description: '새콤달콤 시원한 수제 레몬에이드',
            category: 'drink',
            subcategory: '주스',
            difficulty: 'easy',
            prepTime: 10,
            cookTime: 5,
            servings: 4,
            image: 'https://images.unsplash.com/photo-1621263764928-df1444c5e859?w=800',
            isVerified: false,
            imageVerified: false,
            ingredients: [
                { name: '레몬', amount: '3', unit: '개', category: 'vegetables' },
                { name: '설탕', amount: '100', unit: 'g', category: 'seasoning' },
                { name: '물', amount: '1', unit: 'L', category: 'other' },
                { name: '탄산수', amount: '500', unit: 'ml', category: 'other' },
                { name: '민트잎', amount: '조금', unit: '', category: 'vegetables' }
            ],
            steps: [
                { text: '설탕과 물 100ml를 냄비에 넣고 설탕이 녹을 때까지 끓인다.' },
                { text: '레몬 2개는 즙을 짜고, 1개는 슬라이스한다.' },
                { text: '시럽이 식으면 레몬즙과 나머지 물을 섞는다.' },
                { text: '잔에 얼음을 담고 레몬에이드를 붓는다.' },
                { text: '탄산수를 넣고 레몬 슬라이스와 민트를 올린다.' }
            ],
            tags: ['음료', '여름', '간단']
        },
        {
            title: '달고나 커피',
            description: '부드러운 우유 위에 달콤한 커피 크림을 올린 트렌디한 음료',
            category: 'drink',
            subcategory: '커피',
            difficulty: 'easy',
            prepTime: 10,
            cookTime: 0,
            servings: 1,
            image: 'https://images.unsplash.com/photo-1592663527359-cf6642f54cff?w=800',
            isVerified: false,
            imageVerified: false,
            ingredients: [
                { name: '인스턴트 커피', amount: '2', unit: '큰술', category: 'other' },
                { name: '설탕', amount: '2', unit: '큰술', category: 'seasoning' },
                { name: '뜨거운 물', amount: '2', unit: '큰술', category: 'other' },
                { name: '우유', amount: '200', unit: 'ml', category: 'dairy' }
            ],
            steps: [
                { text: '볼에 인스턴트 커피, 설탕, 뜨거운 물을 1:1:1 비율로 넣는다.' },
                { text: '거품기로 크림색이 되고 뻑뻑해질 때까지 5분간 휘핑한다.' },
                { text: '잔에 얼음과 차가운 우유를 붓는다.' },
                { text: '휘핑한 커피 크림을 우유 위에 올린다.' }
            ],
            tags: ['음료', '커피', '간단']
        },
        {
            title: '아이스 녹차 라떼',
            description: '고소한 녹차와 우유가 어우러진 시원한 음료',
            category: 'drink',
            subcategory: '차',
            difficulty: 'easy',
            prepTime: 5,
            cookTime: 0,
            servings: 1,
            image: 'https://images.unsplash.com/photo-1495195134817-aeb325a55b65?w=800',
            isVerified: false,
            imageVerified: false,
            ingredients: [
                { name: '녹차 가루', amount: '2', unit: '작은술', category: 'other' },
                { name: '뜨거운 물', amount: '50', unit: 'ml', category: 'other' },
                { name: '우유', amount: '200', unit: 'ml', category: 'dairy' },
                { name: '설탕 또는 꿀', amount: '1', unit: '큰술', category: 'seasoning' }
            ],
            steps: [
                { text: '녹차 가루에 뜨거운 물을 조금 넣고 개어준다.' },
                { text: '설탕을 넣고 녹인다.' },
                { text: '잔에 얼음을 가득 담는다.' },
                { text: '우유를 붓고 녹차 페이스트를 올린다.' },
                { text: '저어서 마신다.' }
            ],
            tags: ['음료', '차', '간단']
        },
        {
            title: '주먹밥',
            description: '도시락으로 딱 좋은 한입 크기 주먹밥',
            category: 'other',
            subcategory: '간식',
            difficulty: 'easy',
            prepTime: 15,
            cookTime: 0,
            servings: 4,
            image: 'https://images.unsplash.com/photo-1495195134817-aeb325a55b65?w=800',
            isVerified: false,
            imageVerified: false,
            ingredients: [
                { name: '밥', amount: '2', unit: '공기', category: 'grain' },
                { name: '참치 캔', amount: '1', unit: '캔', category: 'seafood' },
                { name: '마요네즈', amount: '2', unit: '큰술', category: 'seasoning' },
                { name: '참기름', amount: '1', unit: '큰술', category: 'seasoning' },
                { name: '김가루', amount: '적당량', unit: '', category: 'other' }
            ],
            steps: [
                { text: '참치는 기름을 빼고 마요네즈와 섞는다.' },
                { text: '밥에 참기름, 소금, 통깨를 넣고 섞는다.' },
                { text: '밥을 손바닥에 펴고 참치를 올린다.' },
                { text: '동그랗게 뭉쳐 주먹밥을 만든다.' },
                { text: '김가루를 묻혀 완성한다.' }
            ],
            tags: ['도시락', '간단', '점심']
        },
        {
            title: '토스트',
            description: '달콤한 딸기잼과 버터를 바른 클래식 토스트',
            category: 'other',
            subcategory: '간식',
            difficulty: 'easy',
            prepTime: 2,
            cookTime: 3,
            servings: 1,
            image: 'https://images.unsplash.com/photo-1495195134817-aeb325a55b65?w=800',
            isVerified: false,
            imageVerified: false,
            ingredients: [
                { name: '식빵', amount: '2', unit: '장', category: 'grain' },
                { name: '버터', amount: '10', unit: 'g', category: 'dairy' },
                { name: '딸기잼', amount: '2', unit: '큰술', category: 'seasoning' }
            ],
            steps: [
                { text: '토스터나 팬에서 식빵을 노릇하게 굽는다.' },
                { text: '뜨거울 때 버터를 바른다.' },
                { text: '딸기잼을 올려 완성한다.' }
            ],
            tags: ['아침', '간단', '간식']
        },
        {
            title: '쌀국수 (포)',
            description: '맑은 소고기 육수에 쌀면을 넣은 베트남 대표 국수',
            category: 'southeast_asian',
            subcategory: '국물',
            difficulty: 'medium',
            prepTime: 20,
            cookTime: 60,
            servings: 2,
            image: 'https://images.unsplash.com/photo-1495195134817-aeb325a55b65?w=800',
            isVerified: false,
            imageVerified: false,
            ingredients: [
                { name: '쌀국수 면', amount: '200', unit: 'g', category: 'grain' },
                { name: '소고기 양지', amount: '300', unit: 'g', category: 'meat' },
                { name: '양파', amount: '1', unit: '개', category: 'vegetables' },
                { name: '생강', amount: '1', unit: '쪽', category: 'vegetables' },
                { name: '계피스틱', amount: '1', unit: '개', category: 'seasoning' },
                { name: '숙주', amount: '100', unit: 'g', category: 'vegetables' },
                { name: '고수', amount: '조금', unit: '', category: 'vegetables' },
                { name: '라임', amount: '1', unit: '개', category: 'vegetables' }
            ],
            steps: [
                { text: '양파와 생강을 반으로 잘라 팬에서 껍질째 굽는다.' },
                { text: '냄비에 물을 붓고 소고기, 구운 양파, 생강, 계피를 넣어 1시간 끓인다.' },
                { text: '육수가 우러나면 소고기를 건져 얇게 썬다.' },
                { text: '쌀국수 면은 끓는 물에 3분간 삶아 물기를 뺀다.' },
                { text: '그릇에 면을 담고 육수를 붓는다.' },
                { text: '숙주, 고수, 라임을 곁들여 낸다.' }
            ],
            tags: ['국물', '면', '베트남', '동남아'],
            famousRestaurants: [
                { name: '포메인', location: '서울 마포구', searchKeyword: '포메인 쌀국수' },
                { name: '에머이', location: '서울 강남구', searchKeyword: '에머이 쌀국수' }
            ]
        },
        {
            title: '팟타이',
            description: '새콤달콤한 소스에 볶은 태국식 볶음면',
            category: 'southeast_asian',
            subcategory: '면',
            difficulty: 'medium',
            prepTime: 15,
            cookTime: 15,
            servings: 2,
            image: 'https://images.unsplash.com/photo-1559847844-5315695dadae?w=800',
            isVerified: false,
            imageVerified: true,
            ingredients: [
                { name: '쌀면 (센렉)', amount: '200', unit: 'g', category: 'grain' },
                { name: '새우', amount: '100', unit: 'g', category: 'seafood' },
                { name: '두부', amount: '100', unit: 'g', category: 'other' },
                { name: '계란', amount: '2', unit: '개', category: 'dairy' },
                { name: '숙주', amount: '100', unit: 'g', category: 'vegetables' },
                { name: '피시소스', amount: '2', unit: '큰술', category: 'seasoning' },
                { name: '타마린드 페이스트', amount: '2', unit: '큰술', category: 'seasoning' },
                { name: '땅콩', amount: '2', unit: '큰술', category: 'other' }
            ],
            steps: [
                { text: '쌀면은 미지근한 물에 30분간 불린다.' },
                { text: '피시소스, 타마린드, 설탕을 섞어 소스를 만든다.' },
                { text: '팬에 기름을 두르고 두부와 새우를 볶는다.' },
                { text: '면을 넣고 소스를 부어 볶는다.' },
                { text: '한쪽에 계란을 풀어 스크램블하고 면과 섞는다.' },
                { text: '숙주를 넣고 땅콩을 뿌려 완성한다.' }
            ],
            tags: ['면', '볶음', '태국', '동남아'],
            famousRestaurants: [
                { name: '쏭타이', location: '서울 이태원', searchKeyword: '쏭타이 팟타이' },
                { name: '타이가든', location: '서울 강남구', searchKeyword: '타이가든' }
            ]
        },
        {
            title: '나시고랭',
            description: '인도네시아식 매콤한 볶음밥',
            category: 'southeast_asian',
            subcategory: '밥',
            difficulty: 'easy',
            prepTime: 10,
            cookTime: 15,
            servings: 2,
            image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800',
            isVerified: false,
            imageVerified: true,
            ingredients: [
                { name: '찬밥', amount: '2', unit: '공기', category: 'grain' },
                { name: '새우', amount: '100', unit: 'g', category: 'seafood' },
                { name: '계란', amount: '2', unit: '개', category: 'dairy' },
                { name: '삼발소스', amount: '2', unit: '큰술', category: 'seasoning' },
                { name: '케찹마니스', amount: '1', unit: '큰술', category: 'seasoning' },
                { name: '대파', amount: '2', unit: '대', category: 'vegetables' }
            ],
            steps: [
                { text: '팬에 기름을 두르고 새우를 볶는다.' },
                { text: '삼발소스를 넣고 향을 낸다.' },
                { text: '찬밥을 넣고 케찹마니스와 함께 볶는다.' },
                { text: '대파를 넣고 섞는다.' },
                { text: '계란 프라이를 올려 완성한다.' }
            ],
            tags: ['밥', '볶음', '인도네시아', '동남아', '매운']
        },
        {
            title: '버터 치킨 카레',
            description: '크리미한 토마토 소스에 부드러운 치킨이 들어간 인도 대표 카레',
            category: 'indian',
            subcategory: '카레',
            difficulty: 'medium',
            prepTime: 30,
            cookTime: 40,
            servings: 4,
            image: 'https://images.unsplash.com/photo-1495195134817-aeb325a55b65?w=800',
            isVerified: false,
            imageVerified: false,
            ingredients: [
                { name: '닭가슴살', amount: '500', unit: 'g', category: 'meat' },
                { name: '요거트', amount: '100', unit: 'g', category: 'dairy' },
                { name: '토마토 퓨레', amount: '200', unit: 'g', category: 'vegetables' },
                { name: '생크림', amount: '100', unit: 'ml', category: 'dairy' },
                { name: '버터', amount: '50', unit: 'g', category: 'dairy' },
                { name: '가람마살라', amount: '1', unit: '큰술', category: 'seasoning' },
                { name: '강황', amount: '1', unit: '작은술', category: 'seasoning' },
                { name: '카레가루', amount: '2', unit: '큰술', category: 'seasoning' }
            ],
            steps: [
                { text: '닭고기에 요거트, 강황, 카레가루를 버무려 30분 재운다.' },
                { text: '팬에 버터를 녹이고 마늘, 생강을 볶는다.' },
                { text: '토마토 퓨레를 넣고 10분간 끓인다.' },
                { text: '재워둔 닭고기를 넣고 익힌다.' },
                { text: '생크림과 가람마살라를 넣고 5분 더 끓인다.' },
                { text: '고수를 올려 완성한다.' }
            ],
            tags: ['카레', '저녁', '인도', '크리미'],
            famousRestaurants: [
                { name: '간다라', location: '서울 이태원', searchKeyword: '간다라 인도음식' },
                { name: '마하라자', location: '서울 홍대', searchKeyword: '마하라자 카레' }
            ]
        },
        {
            title: '탄두리 치킨',
            description: '향신료 양념에 재운 닭을 화덕에서 구운 인도식 치킨',
            category: 'indian',
            subcategory: '탄두리',
            difficulty: 'medium',
            prepTime: 240,
            cookTime: 30,
            servings: 4,
            image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=800',
            isVerified: false,
            imageVerified: false,
            ingredients: [
                { name: '닭다리', amount: '8', unit: '개', category: 'meat' },
                { name: '요거트', amount: '200', unit: 'g', category: 'dairy' },
                { name: '레몬즙', amount: '2', unit: '큰술', category: 'seasoning' },
                { name: '탄두리 마살라', amount: '3', unit: '큰술', category: 'seasoning' },
                { name: '다진 마늘', amount: '2', unit: '큰술', category: 'seasoning' },
                { name: '생강', amount: '1', unit: '큰술', category: 'seasoning' }
            ],
            steps: [
                { text: '닭에 칼집을 넣고 레몬즙을 뿌린다.' },
                { text: '요거트, 탄두리 마살라, 마늘, 생강을 섞어 양념장을 만든다.' },
                { text: '닭에 양념장을 발라 최소 4시간 (하룻밤) 재운다.' },
                { text: '200도 오븐에서 25-30분간 굽는다.' },
                { text: '중간에 뒤집어가며 골고루 익힌다.' }
            ],
            tags: ['구이', '인도', '손님상', '매운']
        },
        {
            title: '난',
            description: '부드럽고 쫄깃한 인도식 빵',
            category: 'indian',
            subcategory: '빵',
            difficulty: 'medium',
            prepTime: 90,
            cookTime: 15,
            servings: 4,
            image: 'https://images.unsplash.com/photo-1495195134817-aeb325a55b65?w=800',
            isVerified: false,
            imageVerified: false,
            ingredients: [
                { name: '강력분', amount: '300', unit: 'g', category: 'grain' },
                { name: '요거트', amount: '100', unit: 'g', category: 'dairy' },
                { name: '이스트', amount: '1', unit: '작은술', category: 'seasoning' },
                { name: '설탕', amount: '1', unit: '작은술', category: 'seasoning' },
                { name: '버터', amount: '30', unit: 'g', category: 'dairy' }
            ],
            steps: [
                { text: '따뜻한 물에 이스트와 설탕을 녹인다.' },
                { text: '밀가루에 요거트, 이스트물을 넣고 반죽한다.' },
                { text: '1시간 동안 발효시킨다.' },
                { text: '반죽을 나눠 타원형으로 민다.' },
                { text: '달군 팬에서 앞뒤로 구워낸다.' },
                { text: '버터를 발라 완성한다.' }
            ],
            tags: ['빵', '인도', '간단']
        },
        {
            title: '타코',
            description: '바삭한 토르티야에 고기와 신선한 채소를 넣은 멕시코 대표 음식',
            category: 'mexican',
            subcategory: '타코',
            difficulty: 'easy',
            prepTime: 15,
            cookTime: 15,
            servings: 4,
            image: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=800',
            isVerified: false,
            imageVerified: false,
            ingredients: [
                { name: '타코 쉘', amount: '8', unit: '개', category: 'grain' },
                { name: '소고기 다짐육', amount: '300', unit: 'g', category: 'meat' },
                { name: '양상추', amount: '1/4', unit: '통', category: 'vegetables' },
                { name: '토마토', amount: '2', unit: '개', category: 'vegetables' },
                { name: '체다 치즈', amount: '100', unit: 'g', category: 'dairy' },
                { name: '타코 시즈닝', amount: '2', unit: '큰술', category: 'seasoning' },
                { name: '사워크림', amount: '100', unit: 'g', category: 'dairy' }
            ],
            steps: [
                { text: '팬에 다짐육을 볶다가 타코 시즈닝을 넣는다.' },
                { text: '양상추는 채썰고 토마토는 깍둑썬다.' },
                { text: '치즈는 갈아준다.' },
                { text: '타코 쉘을 오븐에서 살짝 데운다.' },
                { text: '쉘에 고기, 채소, 치즈 순으로 올린다.' },
                { text: '사워크림을 뿌려 완성한다.' }
            ],
            tags: ['간단', '멕시코', '저녁', '파티'],
            famousRestaurants: [
                { name: '온더보더', location: '서울 강남구', searchKeyword: '온더보더 타코' },
                { name: '타코벨', location: '서울 전역', searchKeyword: '타코벨' }
            ]
        },
        {
            title: '부리토',
            description: '큼직한 토르티야에 밥, 고기, 콩을 싸먹는 멕시코 요리',
            category: 'mexican',
            subcategory: '부리토',
            difficulty: 'easy',
            prepTime: 15,
            cookTime: 20,
            servings: 2,
            image: 'https://images.unsplash.com/photo-1495195134817-aeb325a55b65?w=800',
            isVerified: false,
            imageVerified: false,
            ingredients: [
                { name: '플라워 토르티야', amount: '2', unit: '장', category: 'grain' },
                { name: '밥', amount: '1', unit: '공기', category: 'grain' },
                { name: '닭가슴살', amount: '200', unit: 'g', category: 'meat' },
                { name: '검은콩 통조림', amount: '1/2', unit: '캔', category: 'vegetables' },
                { name: '옥수수', amount: '1/2', unit: '캔', category: 'vegetables' },
                { name: '살사소스', amount: '4', unit: '큰술', category: 'seasoning' }
            ],
            steps: [
                { text: '닭가슴살을 소금, 후추로 간해서 굽고 잘게 찢는다.' },
                { text: '토르티야를 팬에서 살짝 데운다.' },
                { text: '토르티야 중앙에 밥을 깐다.' },
                { text: '닭고기, 콩, 옥수수를 올린다.' },
                { text: '살사소스를 뿌린다.' },
                { text: '양쪽을 접고 돌돌 말아 완성한다.' }
            ],
            tags: ['점심', '멕시코', '간단', '도시락']
        },
        {
            title: '과카몰리',
            description: '신선한 아보카도로 만든 멕시코 디핑 소스',
            category: 'mexican',
            subcategory: '나초',
            difficulty: 'easy',
            prepTime: 10,
            cookTime: 0,
            servings: 4,
            image: 'https://images.unsplash.com/photo-1600335895229-6e75511892c8?w=800',
            isVerified: false,
            imageVerified: false,
            ingredients: [
                { name: '아보카도', amount: '2', unit: '개', category: 'vegetables' },
                { name: '토마토', amount: '1', unit: '개', category: 'vegetables' },
                { name: '양파', amount: '1/4', unit: '개', category: 'vegetables' },
                { name: '라임', amount: '1', unit: '개', category: 'vegetables' },
                { name: '고수', amount: '조금', unit: '', category: 'vegetables' },
                { name: '소금', amount: '1/2', unit: '작은술', category: 'seasoning' }
            ],
            steps: [
                { text: '아보카도를 반으로 갈라 씨를 빼고 과육을 꺼낸다.' },
                { text: '포크로 아보카도를 으깬다.' },
                { text: '토마토와 양파를 잘게 다진다.' },
                { text: '모든 재료를 섞고 라임즙을 넣는다.' },
                { text: '소금으로 간하고 고수를 올린다.' }
            ],
            tags: ['간식', '멕시코', '건강', '채식']
        },
        {
            title: '떡볶이',
            description: '매콤달콤한 고추장 소스에 쫄깃한 떡을 넣은 대표 분식',
            category: 'bunsik',
            subcategory: '떡볶이',
            difficulty: 'easy',
            prepTime: 10,
            cookTime: 20,
            servings: 2,
            image: 'https://images.unsplash.com/photo-1495195134817-aeb325a55b65?w=800',
            isVerified: false,
            imageVerified: false,
            ingredients: [
                { name: '떡볶이 떡', amount: '300', unit: 'g', category: 'grain' },
                { name: '어묵', amount: '100', unit: 'g', category: 'seafood' },
                { name: '고추장', amount: '2', unit: '큰술', category: 'seasoning' },
                { name: '고춧가루', amount: '1', unit: '큰술', category: 'seasoning' },
                { name: '설탕', amount: '1', unit: '큰술', category: 'seasoning' },
                { name: '대파', amount: '1', unit: '대', category: 'vegetables' },
                { name: '삶은 계란', amount: '2', unit: '개', category: 'dairy' }
            ],
            steps: [
                { text: '냄비에 물 2컵을 붓고 끓인다.' },
                { text: '고추장, 고춧가루, 설탕, 간장을 넣어 양념장을 만든다.' },
                { text: '떡과 어묵을 넣고 끓인다.' },
                { text: '떡이 부드러워지면 대파를 넣는다.' },
                { text: '삶은 계란을 올려 완성한다.' }
            ],
            tags: ['매운', '간식', '한국', '분식'],
            famousRestaurants: [
                { name: '신당동 떡볶이 타운', location: '서울 중구', searchKeyword: '신당동 떡볶이' },
                { name: '죠스떡볶이', location: '서울 전역', searchKeyword: '죠스떡볶이' }
            ]
        },
        {
            title: '김밥',
            description: '밥과 다양한 속재료를 김에 말아낸 한국식 롤',
            category: 'bunsik',
            subcategory: '김밥',
            difficulty: 'medium',
            prepTime: 30,
            cookTime: 20,
            servings: 4,
            image: 'https://images.unsplash.com/photo-1590301157890-4810ed352733?w=800',
            isVerified: false,
            imageVerified: true,
            ingredients: [
                { name: '밥', amount: '3', unit: '공기', category: 'grain' },
                { name: '김', amount: '4', unit: '장', category: 'other' },
                { name: '단무지', amount: '4', unit: '줄', category: 'vegetables' },
                { name: '시금치', amount: '100', unit: 'g', category: 'vegetables' },
                { name: '당근', amount: '1', unit: '개', category: 'vegetables' },
                { name: '계란', amount: '3', unit: '개', category: 'dairy' },
                { name: '햄', amount: '100', unit: 'g', category: 'meat' },
                { name: '참기름', amount: '1', unit: '큰술', category: 'seasoning' }
            ],
            steps: [
                { text: '밥에 참기름과 소금을 넣어 섞는다.' },
                { text: '시금치는 데쳐 무치고, 당근은 채썰어 볶는다.' },
                { text: '계란은 지단을 부쳐 길게 자른다.' },
                { text: '김 위에 밥을 얇게 펴고 재료를 올린다.' },
                { text: '아래에서 위로 단단히 말아준다.' },
                { text: '참기름을 바르고 먹기 좋게 썬다.' }
            ],
            tags: ['도시락', '한국', '분식', '간단']
        },
        {
            title: '순대',
            description: '돼지 내장에 당면과 선지를 채워 만든 전통 분식',
            category: 'bunsik',
            subcategory: '튀김',
            difficulty: 'hard',
            prepTime: 60,
            cookTime: 40,
            servings: 4,
            image: 'https://images.unsplash.com/photo-1495195134817-aeb325a55b65?w=800',
            isVerified: false,
            imageVerified: false,
            ingredients: [
                { name: '돼지 창자', amount: '500', unit: 'g', category: 'meat' },
                { name: '당면', amount: '200', unit: 'g', category: 'grain' },
                { name: '선지', amount: '200', unit: 'g', category: 'meat' },
                { name: '두부', amount: '1/2', unit: '모', category: 'other' },
                { name: '대파', amount: '2', unit: '대', category: 'vegetables' }
            ],
            steps: [
                { text: '당면은 삶아서 잘게 자른다.' },
                { text: '두부는 으깨고 대파는 송송 썬다.' },
                { text: '당면, 선지, 두부, 대파를 섞어 소를 만든다.' },
                { text: '창자에 소를 채우고 끝을 묶는다.' },
                { text: '끓는 물에 40분간 삶는다.' },
                { text: '먹기 좋게 썰어 소금장과 함께 낸다.' }
            ],
            tags: ['한국', '분식', '전통']
        },
        {
            title: '라볶이',
            description: '떡볶이에 라면 사리를 넣어 만든 분식',
            category: 'bunsik',
            subcategory: '떡볶이',
            difficulty: 'easy',
            prepTime: 5,
            cookTime: 15,
            servings: 2,
            image: 'https://images.unsplash.com/photo-1495195134817-aeb325a55b65?w=800',
            isVerified: false,
            imageVerified: false,
            ingredients: [
                { name: '떡볶이 떡', amount: '200', unit: 'g', category: 'grain' },
                { name: '라면 사리', amount: '1', unit: '개', category: 'grain' },
                { name: '어묵', amount: '50', unit: 'g', category: 'seafood' },
                { name: '고추장', amount: '2', unit: '큰술', category: 'seasoning' },
                { name: '고춧가루', amount: '1', unit: '큰술', category: 'seasoning' },
                { name: '설탕', amount: '1', unit: '큰술', category: 'seasoning' }
            ],
            steps: [
                { text: '냄비에 물 2.5컵을 붓고 양념장을 풀어 끓인다.' },
                { text: '떡과 어묵을 넣고 끓인다.' },
                { text: '떡이 반쯤 익으면 라면 사리를 넣는다.' },
                { text: '면이 익으면 대파를 넣고 완성한다.' }
            ],
            tags: ['매운', '간식', '한국', '분식', '야식']
        },
        {
            title: '해물파전',
            description: '바삭하고 쫄깃한 해물과 파가 어우러진 비 오는 날 생각나는 한국 전통 부침',
            category: 'korean',
            subcategory: '전/부침',
            difficulty: 'medium',
            prepTime: 20,
            cookTime: 20,
            servings: 2,
            image: 'https://images.unsplash.com/photo-1495195134817-aeb325a55b65?w=800',
            isVerified: false,
            imageVerified: false,
            ingredients: [
                { name: '대파', amount: '4', unit: '대', category: 'vegetables' },
                { name: '오징어', amount: '1/2', unit: '마리', category: 'seafood' },
                { name: '새우', amount: '100', unit: 'g', category: 'seafood' },
                { name: '홍합살', amount: '50', unit: 'g', category: 'seafood' },
                { name: '부침가루', amount: '1', unit: '컵', category: 'grain' },
                { name: '찬물', amount: '1', unit: '컵', category: 'other' },
                { name: '계란', amount: '1', unit: '개', category: 'dairy' },
                { name: '식용유', amount: '4', unit: '큰술', category: 'seasoning' }
            ],
            steps: [
                { text: '대파는 길이로 반 갈라 10cm 길이로 자른다.' },
                { text: '오징어는 깨끗이 손질해서 링으로 썰고, 새우는 껍질을 벗긴다.' },
                { text: '부침가루에 찬물을 넣고 멍울 없이 섞어 반죽을 만든다.' },
                { text: '해물과 대파를 반죽에 넣고 가볍게 섞는다.' },
                { text: '달군 팬에 식용유를 넉넉히 두르고 반죽을 얇게 펴준다.' },
                { text: '중불에서 한쪽 면이 노릇해지면 뒤집어 계란물을 얹고 다시 굽는다.' },
                { text: '양면이 바삭하게 익으면 먹기 좋은 크기로 썰어 완성한다.' }
            ],
            tags: ['비오는날', '안주', '저녁', '해물']
        },
        {
            title: '까르보나라',
            description: '크리미한 계란 소스와 바삭한 판체타가 어우러진 로마식 파스타',
            category: 'western',
            subcategory: '파스타',
            difficulty: 'medium',
            prepTime: 10,
            cookTime: 20,
            servings: 2,
            image: 'https://images.unsplash.com/photo-1588013273468-315fd88ea34c?w=800',
            isVerified: false,
            imageVerified: false,
            ingredients: [
                { name: '스파게티', amount: '200', unit: 'g', category: 'grain' },
                { name: '베이컨 또는 판체타', amount: '150', unit: 'g', category: 'meat' },
                { name: '계란 노른자', amount: '3', unit: '개', category: 'dairy' },
                { name: '파르메산 치즈', amount: '50', unit: 'g', category: 'dairy' },
                { name: '페코리노 치즈', amount: '30', unit: 'g', category: 'dairy' },
                { name: '후추', amount: '1', unit: '작은술', category: 'seasoning' },
                { name: '소금', amount: '적당량', unit: '', category: 'seasoning' }
            ],
            steps: [
                { text: '끓는 소금물에 스파게티를 알덴테로 삶는다.' },
                { text: '볼에 계란 노른자, 파르메산, 페코리노 치즈를 넣고 섞는다.' },
                { text: '팬에 베이컨을 바삭하게 볶아 기름을 낸다.' },
                { text: '삶은 파스타를 베이컨 팬에 넣고 불을 끈다.' },
                { text: '파스타 삶은 물 2큰술을 넣고 계란 소스를 빠르게 섞는다.' },
                { text: '후추를 듬뿍 뿌려 완성한다.' }
            ],
            tags: ['크리미', '저녁', '이탈리안', '클래식']
        },
        {
            title: '봉골레 파스타',
            description: '신선한 바지락과 마늘, 화이트 와인으로 만든 이탈리아 해물 파스타',
            category: 'western',
            subcategory: '파스타',
            difficulty: 'medium',
            prepTime: 15,
            cookTime: 15,
            servings: 2,
            image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=800',
            isVerified: false,
            imageVerified: false,
            ingredients: [
                { name: '링귀네 또는 스파게티', amount: '200', unit: 'g', category: 'grain' },
                { name: '바지락', amount: '500', unit: 'g', category: 'seafood' },
                { name: '마늘', amount: '5', unit: '쪽', category: 'vegetables' },
                { name: '화이트 와인', amount: '100', unit: 'ml', category: 'other' },
                { name: '페페론치노', amount: '2', unit: '개', category: 'seasoning' },
                { name: '올리브오일', amount: '4', unit: '큰술', category: 'seasoning' },
                { name: '이탈리안 파슬리', amount: '적당량', unit: '', category: 'vegetables' }
            ],
            steps: [
                { text: '바지락은 해감하여 깨끗이 씻는다.' },
                { text: '끓는 소금물에 파스타를 삶기 시작한다.' },
                { text: '팬에 올리브오일을 두르고 마늘과 페페론치노를 볶아 향을 낸다.' },
                { text: '바지락을 넣고 화이트 와인을 부어 뚜껑을 덮고 조개가 열릴 때까지 익힌다.' },
                { text: '삶은 파스타와 삶은 물 조금을 넣고 잘 섞는다.' },
                { text: '파슬리를 뿌려 완성한다.' }
            ],
            tags: ['해물', '이탈리안', '저녁', '와인']
        },
        {
            title: '립아이 스테이크',
            description: '마블링이 풍부한 립아이를 완벽하게 구워낸 클래식 스테이크',
            category: 'western',
            subcategory: '스테이크',
            difficulty: 'medium',
            prepTime: 30,
            cookTime: 15,
            servings: 2,
            image: 'https://images.unsplash.com/photo-1558030006-450675393462?w=800',
            isVerified: false,
            imageVerified: false,
            ingredients: [
                { name: '립아이 스테이크', amount: '400', unit: 'g', category: 'meat' },
                { name: '버터', amount: '30', unit: 'g', category: 'dairy' },
                { name: '마늘', amount: '3', unit: '쪽', category: 'vegetables' },
                { name: '로즈마리', amount: '2', unit: '가지', category: 'vegetables' },
                { name: '타임', amount: '2', unit: '가지', category: 'vegetables' },
                { name: '소금', amount: '적당량', unit: '', category: 'seasoning' },
                { name: '후추', amount: '적당량', unit: '', category: 'seasoning' },
                { name: '식용유', amount: '2', unit: '큰술', category: 'seasoning' }
            ],
            steps: [
                { text: '스테이크는 조리 30분 전에 냉장고에서 꺼내 실온에 둔다.' },
                { text: '키친타올로 수분을 닦고 소금과 후추로 양면에 간한다.' },
                { text: '달군 팬에 식용유를 두르고 센불에서 앞뒤로 2분씩 시어링한다.' },
                { text: '버터, 마늘, 로즈마리, 타임을 넣고 버터 베이스팅한다.' },
                { text: '원하는 굽기까지 익힌 후 5분간 레스팅한다.' },
                { text: '썰어서 접시에 담고 허브 버터를 올려 완성한다.' }
            ],
            tags: ['특별한날', '저녁', '고급', '육류']
        },
        {
            title: '카프레제 샐러드',
            description: '신선한 토마토와 모차렐라 치즈, 바질로 만든 이탈리아 전통 샐러드',
            category: 'western',
            subcategory: '샐러드',
            difficulty: 'easy',
            prepTime: 10,
            cookTime: 0,
            servings: 2,
            image: 'https://images.unsplash.com/photo-1592417817098-8fd3d9eb14a5?w=800',
            isVerified: false,
            imageVerified: false,
            ingredients: [
                { name: '완숙 토마토', amount: '3', unit: '개', category: 'vegetables' },
                { name: '생 모차렐라', amount: '250', unit: 'g', category: 'dairy' },
                { name: '신선한 바질', amount: '10', unit: '잎', category: 'vegetables' },
                { name: '엑스트라 버진 올리브오일', amount: '3', unit: '큰술', category: 'seasoning' },
                { name: '발사믹 글레이즈', amount: '1', unit: '큰술', category: 'seasoning' },
                { name: '소금', amount: '적당량', unit: '', category: 'seasoning' },
                { name: '후추', amount: '적당량', unit: '', category: 'seasoning' }
            ],
            steps: [
                { text: '토마토와 모차렐라를 두께 1cm로 슬라이스한다.' },
                { text: '접시에 토마토와 모차렐라를 번갈아가며 올린다.' },
                { text: '바질 잎을 사이사이에 끼워넣는다.' },
                { text: '올리브오일을 뿌리고 소금, 후추로 간한다.' },
                { text: '발사믹 글레이즈를 뿌려 완성한다.' }
            ],
            tags: ['간단', '이탈리안', '채식', '여름']
        },
        {
            title: '프렌치 어니언 수프',
            description: '달콤하게 캐러멜라이즈한 양파와 치즈 그라탱이 올라간 프랑스 전통 수프',
            category: 'western',
            subcategory: '수프',
            difficulty: 'medium',
            prepTime: 20,
            cookTime: 60,
            servings: 4,
            image: 'https://images.unsplash.com/photo-1534939561126-855b8675edd7?w=800',
            isVerified: false,
            imageVerified: false,
            ingredients: [
                { name: '양파', amount: '4', unit: '개', category: 'vegetables' },
                { name: '버터', amount: '50', unit: 'g', category: 'dairy' },
                { name: '쇠고기 육수', amount: '1', unit: 'L', category: 'other' },
                { name: '화이트 와인', amount: '100', unit: 'ml', category: 'other' },
                { name: '바게트', amount: '4', unit: '조각', category: 'grain' },
                { name: '그뤼에르 치즈', amount: '150', unit: 'g', category: 'dairy' },
                { name: '타임', amount: '2', unit: '가지', category: 'vegetables' }
            ],
            steps: [
                { text: '양파를 얇게 채썬다.' },
                { text: '냄비에 버터를 녹이고 양파를 약불에서 40분간 캐러멜라이즈한다.' },
                { text: '화이트 와인을 넣어 바닥을 긁어내고 졸인다.' },
                { text: '육수와 타임을 넣고 20분간 끓인다.' },
                { text: '오븐용 그릇에 수프를 담고 바게트와 치즈를 올린다.' },
                { text: '200도 오븐에서 치즈가 녹고 갈색이 될 때까지 굽는다.' }
            ],
            tags: ['겨울', '국물', '치즈', '프랑스']
        },
        {
            title: '클램 차우더',
            description: '크리미한 감자 수프에 조개가 듬뿍 들어간 미국 동부 해안의 클래식',
            category: 'western',
            subcategory: '수프',
            difficulty: 'medium',
            prepTime: 20,
            cookTime: 30,
            servings: 4,
            image: 'https://images.unsplash.com/photo-1588566565463-180a5b2090d2?w=800',
            isVerified: false,
            imageVerified: false,
            ingredients: [
                { name: '바지락 또는 대합', amount: '500', unit: 'g', category: 'seafood' },
                { name: '베이컨', amount: '100', unit: 'g', category: 'meat' },
                { name: '감자', amount: '2', unit: '개', category: 'vegetables' },
                { name: '양파', amount: '1', unit: '개', category: 'vegetables' },
                { name: '셀러리', amount: '2', unit: '대', category: 'vegetables' },
                { name: '생크림', amount: '200', unit: 'ml', category: 'dairy' },
                { name: '우유', amount: '300', unit: 'ml', category: 'dairy' },
                { name: '밀가루', amount: '2', unit: '큰술', category: 'grain' }
            ],
            steps: [
                { text: '조개는 물에 삶아 살을 발라내고 육수는 보관한다.' },
                { text: '베이컨을 잘게 썰어 바삭하게 볶는다.' },
                { text: '양파, 셀러리를 볶고 밀가루를 넣어 루를 만든다.' },
                { text: '조개 육수와 우유를 천천히 넣으며 저어준다.' },
                { text: '깍둑썬 감자를 넣고 익을 때까지 끓인다.' },
                { text: '조개살과 생크림을 넣고 5분간 더 끓여 완성한다.' }
            ],
            tags: ['해물', '크리미', '겨울', '미국']
        },
        {
            title: '클래식 치즈버거',
            description: '육즙 가득한 수제 패티와 녹진한 치즈가 만나는 정통 아메리칸 버거',
            category: 'western',
            subcategory: '버거',
            difficulty: 'medium',
            prepTime: 20,
            cookTime: 15,
            servings: 2,
            image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800',
            isVerified: false,
            imageVerified: false,
            ingredients: [
                { name: '소고기 다짐육', amount: '300', unit: 'g', category: 'meat' },
                { name: '버거 번', amount: '2', unit: '개', category: 'grain' },
                { name: '체다 치즈', amount: '2', unit: '장', category: 'dairy' },
                { name: '양상추', amount: '2', unit: '잎', category: 'vegetables' },
                { name: '토마토', amount: '1', unit: '개', category: 'vegetables' },
                { name: '양파', amount: '1/2', unit: '개', category: 'vegetables' },
                { name: '피클', amount: '4', unit: '조각', category: 'vegetables' },
                { name: '케첩', amount: '2', unit: '큰술', category: 'seasoning' },
                { name: '머스타드', amount: '1', unit: '큰술', category: 'seasoning' }
            ],
            steps: [
                { text: '소고기에 소금, 후추를 넣고 가볍게 섞어 패티 모양으로 빚는다.' },
                { text: '달군 팬에서 패티를 센불로 2분씩 양면을 구운다.' },
                { text: '패티 위에 치즈를 올리고 뚜껑을 덮어 녹인다.' },
                { text: '번을 반으로 갈라 안쪽을 팬에 토스트한다.' },
                { text: '아래 번에 양상추, 토마토, 패티 순으로 올린다.' },
                { text: '양파, 피클을 올리고 소스를 뿌려 위 번을 덮는다.' }
            ],
            tags: ['간단', '점심', '미국', '인기']
        },
        {
            title: '규동',
            description: '달콤짭짤한 간장 양념의 소고기를 얹은 일본식 덮밥',
            category: 'japanese',
            subcategory: '덮밥',
            difficulty: 'easy',
            prepTime: 10,
            cookTime: 15,
            servings: 2,
            image: 'https://images.unsplash.com/photo-1495195134817-aeb325a55b65?w=800',
            isVerified: false,
            imageVerified: false,
            ingredients: [
                { name: '소고기 불고기용', amount: '200', unit: 'g', category: 'meat' },
                { name: '양파', amount: '1', unit: '개', category: 'vegetables' },
                { name: '간장', amount: '3', unit: '큰술', category: 'seasoning' },
                { name: '미림', amount: '2', unit: '큰술', category: 'seasoning' },
                { name: '설탕', amount: '1', unit: '큰술', category: 'seasoning' },
                { name: '물', amount: '100', unit: 'ml', category: 'other' },
                { name: '밥', amount: '2', unit: '공기', category: 'grain' }
            ],
            steps: [
                { text: '양파는 얇게 채썬다.' },
                { text: '냄비에 간장, 미림, 설탕, 물을 넣고 끓인다.' },
                { text: '양파를 넣고 중불에서 5분간 익힌다.' },
                { text: '소고기를 넣고 고기가 익을 때까지 조린다.' },
                { text: '밥 위에 고기와 양파를 올려 완성한다.' }
            ],
            tags: ['덮밥', '간단', '점심', '일본']
        },
        {
            title: '카츠동',
            description: '바삭한 돈카츠를 달걀로 감싸 밥 위에 올린 덮밥',
            category: 'japanese',
            subcategory: '덮밥',
            difficulty: 'medium',
            prepTime: 15,
            cookTime: 20,
            servings: 2,
            image: 'https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?w=800',
            isVerified: false,
            imageVerified: false,
            ingredients: [
                { name: '돈카츠', amount: '2', unit: '장', category: 'meat' },
                { name: '양파', amount: '1/2', unit: '개', category: 'vegetables' },
                { name: '달걀', amount: '3', unit: '개', category: 'dairy' },
                { name: '간장', amount: '3', unit: '큰술', category: 'seasoning' },
                { name: '미림', amount: '2', unit: '큰술', category: 'seasoning' },
                { name: '다시마육수', amount: '150', unit: 'ml', category: 'other' },
                { name: '밥', amount: '2', unit: '공기', category: 'grain' }
            ],
            steps: [
                { text: '양파는 얇게 채썬다.' },
                { text: '작은 팬에 다시마육수, 간장, 미림을 넣고 끓인다.' },
                { text: '양파를 넣고 부드러워질 때까지 익힌다.' },
                { text: '먹기 좋게 자른 돈카츠를 넣는다.' },
                { text: '풀어놓은 달걀을 돌려 붓고 뚜껑을 덮어 반숙으로 익힌다.' },
                { text: '밥 위에 올려 완성한다.' }
            ],
            tags: ['덮밥', '든든', '저녁', '일본']
        },
        {
            title: '돈코츠 라멘',
            description: '진하고 크리미한 돼지뼈 육수의 일본 라멘',
            category: 'japanese',
            subcategory: '면',
            difficulty: 'hard',
            prepTime: 30,
            cookTime: 60,
            servings: 2,
            image: 'https://images.unsplash.com/photo-1495195134817-aeb325a55b65?w=800',
            isVerified: false,
            imageVerified: false,
            ingredients: [
                { name: '라멘면', amount: '200', unit: 'g', category: 'grain' },
                { name: '돈코츠 육수', amount: '800', unit: 'ml', category: 'other' },
                { name: '차슈', amount: '4', unit: '장', category: 'meat' },
                { name: '반숙란', amount: '2', unit: '개', category: 'dairy' },
                { name: '파', amount: '2', unit: '대', category: 'vegetables' },
                { name: '목이버섯', amount: '30', unit: 'g', category: 'vegetables' },
                { name: '타레소스', amount: '4', unit: '큰술', category: 'seasoning' }
            ],
            steps: [
                { text: '돈코츠 육수를 냄비에 넣고 끓인다.' },
                { text: '그릇에 타레소스를 넣고 뜨거운 육수를 부어 섞는다.' },
                { text: '면을 삶아서 물기를 빼고 그릇에 담는다.' },
                { text: '차슈, 반숙란, 파, 목이버섯을 올린다.' },
                { text: '취향에 따라 홍생강, 참깨를 뿌려 완성한다.' }
            ],
            tags: ['면', '국물', '저녁', '일본']
        },
        {
            title: '연어초밥',
            description: '신선한 연어를 올린 일본 정통 스시',
            category: 'japanese',
            subcategory: '초밥',
            difficulty: 'medium',
            prepTime: 30,
            cookTime: 20,
            servings: 2,
            image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=800',
            isVerified: false,
            imageVerified: false,
            ingredients: [
                { name: '연어 사시미용', amount: '200', unit: 'g', category: 'seafood' },
                { name: '초밥용 쌀', amount: '300', unit: 'g', category: 'grain' },
                { name: '식초', amount: '3', unit: '큰술', category: 'seasoning' },
                { name: '설탕', amount: '1', unit: '큰술', category: 'seasoning' },
                { name: '소금', amount: '1/2', unit: '작은술', category: 'seasoning' },
                { name: '와사비', amount: '적당량', unit: '', category: 'seasoning' }
            ],
            steps: [
                { text: '밥을 평소보다 물을 조금 줄여 고슬고슬하게 짓는다.' },
                { text: '식초, 설탕, 소금을 섞어 배합초를 만든다.' },
                { text: '따뜻한 밥에 배합초를 넣고 부채질하며 섞는다.' },
                { text: '연어는 초밥 크기에 맞게 슬라이스한다.' },
                { text: '손에 물을 묻히고 밥을 쥐어 타원형으로 만든다.' },
                { text: '밥 위에 와사비를 살짝 바르고 연어를 올려 완성한다.' }
            ],
            tags: ['초밥', '해산물', '손님상', '일본']
        },
        {
            title: '데리야끼 치킨',
            description: '달콤짭짤한 데리야끼 소스를 바른 구운 닭고기',
            category: 'japanese',
            subcategory: '구이',
            difficulty: 'easy',
            prepTime: 10,
            cookTime: 20,
            servings: 2,
            image: 'https://images.unsplash.com/photo-1495195134817-aeb325a55b65?w=800',
            isVerified: false,
            imageVerified: false,
            ingredients: [
                { name: '닭다리살', amount: '400', unit: 'g', category: 'meat' },
                { name: '간장', amount: '4', unit: '큰술', category: 'seasoning' },
                { name: '미림', amount: '3', unit: '큰술', category: 'seasoning' },
                { name: '청주', amount: '2', unit: '큰술', category: 'seasoning' },
                { name: '설탕', amount: '2', unit: '큰술', category: 'seasoning' },
                { name: '통깨', amount: '1', unit: '작은술', category: 'seasoning' }
            ],
            steps: [
                { text: '닭다리살은 두꺼운 부분에 칼집을 넣어 두께를 고르게 한다.' },
                { text: '간장, 미림, 청주, 설탕을 섞어 데리야끼 소스를 만든다.' },
                { text: '팬에 기름을 두르고 닭을 껍질면부터 노릇하게 굽는다.' },
                { text: '뒤집어 반대쪽도 익히고, 소스를 부어 조리듯 익힌다.' },
                { text: '소스가 졸아들면서 닭에 윤기가 나면 완성.' },
                { text: '먹기 좋게 썰고 통깨를 뿌려 낸다.' }
            ],
            tags: ['구이', '달콤', '저녁', '일본']
        },
        {
            title: '샤오롱바오',
            description: '육즙 가득한 상하이식 소롱포',
            category: 'chinese',
            subcategory: '딤섬',
            difficulty: 'hard',
            prepTime: 60,
            cookTime: 15,
            servings: 4,
            image: 'https://images.unsplash.com/photo-1495195134817-aeb325a55b65?w=800',
            isVerified: false,
            imageVerified: false,
            ingredients: [
                { name: '밀가루', amount: '200', unit: 'g', category: 'grain' },
                { name: '돼지고기 간것', amount: '300', unit: 'g', category: 'meat' },
                { name: '돼지껍데기 젤리', amount: '100', unit: 'g', category: 'meat' },
                { name: '생강', amount: '1', unit: '톨', category: 'vegetables' },
                { name: '간장', amount: '2', unit: '큰술', category: 'seasoning' },
                { name: '참기름', amount: '1', unit: '큰술', category: 'seasoning' }
            ],
            steps: [
                { text: '밀가루에 뜨거운 물을 넣고 반죽하여 30분 휴지시킨다.' },
                { text: '돼지고기에 간장, 참기름, 다진 생강, 잘게 썬 젤리를 섞는다.' },
                { text: '반죽을 작게 나누어 얇게 밀어 피를 만든다.' },
                { text: '피에 소를 넣고 주름을 잡아 빚는다.' },
                { text: '찜기에 종이를 깔고 센불에서 10분간 찐다.' },
                { text: '초간장과 생강채를 곁들여 낸다.' }
            ],
            tags: ['딤섬', '만두', '손님상', '중국']
        },
        {
            title: '동파육',
            description: '간장과 향신료에 푹 찐 부드러운 삼겹살 요리',
            category: 'chinese',
            subcategory: '찜',
            difficulty: 'hard',
            prepTime: 30,
            cookTime: 120,
            servings: 4,
            image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800',
            isVerified: false,
            imageVerified: true,
            ingredients: [
                { name: '삼겹살', amount: '600', unit: 'g', category: 'meat' },
                { name: '간장', amount: '100', unit: 'ml', category: 'seasoning' },
                { name: '노두유', amount: '50', unit: 'ml', category: 'seasoning' },
                { name: '황주', amount: '100', unit: 'ml', category: 'seasoning' },
                { name: '설탕', amount: '50', unit: 'g', category: 'seasoning' },
                { name: '팔각', amount: '2', unit: '개', category: 'seasoning' },
                { name: '대파', amount: '2', unit: '대', category: 'vegetables' },
                { name: '생강', amount: '1', unit: '톨', category: 'vegetables' }
            ],
            steps: [
                { text: '삼겹살은 큰 덩어리로 잘라 끓는 물에 데쳐 불순물을 제거한다.' },
                { text: '팬에 설탕을 넣고 카라멜을 만들어 고기 표면을 코팅한다.' },
                { text: '냄비에 대파, 생강을 깔고 고기를 올린다.' },
                { text: '간장, 노두유, 황주, 팔각을 넣고 물을 부어 잠기게 한다.' },
                { text: '센불에서 끓인 후 약불로 줄여 2시간 동안 조린다.' },
                { text: '국물이 졸아들고 고기가 부드러워지면 완성한다.' }
            ],
            tags: ['찜', '손님상', '특별한 날', '중국']
        },
        {
            title: '똠양꿍',
            description: '태국의 새콤매콤한 새우 수프로 세계 3대 수프 중 하나',
            category: 'southeast_asian',
            subcategory: '국물',
            difficulty: 'medium',
            prepTime: 20,
            cookTime: 20,
            servings: 2,
            image: 'https://images.unsplash.com/photo-1548943487-a2e4e43b4853?w=800',
            isVerified: false,
            imageVerified: false,
            ingredients: [
                { name: '새우', amount: '200', unit: 'g', category: 'seafood' },
                { name: '버섯', amount: '100', unit: 'g', category: 'vegetables' },
                { name: '레몬그라스', amount: '2', unit: '대', category: 'vegetables' },
                { name: '코코넛 밀크', amount: '200', unit: 'ml', category: 'other' },
                { name: '피쉬소스', amount: '2', unit: '큰술', category: 'seasoning' },
                { name: '라임', amount: '2', unit: '개', category: 'vegetables' },
                { name: '고추', amount: '5', unit: '개', category: 'vegetables' }
            ],
            steps: [
                { text: '레몬그라스는 대각선으로 썬다.' },
                { text: '냄비에 물을 붓고 레몬그라스를 넣어 끓인다.' },
                { text: '새우와 버섯을 넣고 5분간 끓인다.' },
                { text: '코코넛 밀크와 고추를 넣는다.' },
                { text: '피쉬소스로 간하고 라임즙을 넣어 완성한다.' }
            ],
            tags: ['태국', '국물', '매운', '동남아']
        },
        {
            title: '포',
            description: '베트남의 대표 쌀국수로 맑은 육수와 신선한 허브가 특징',
            category: 'southeast_asian',
            subcategory: '국물',
            difficulty: 'medium',
            prepTime: 30,
            cookTime: 120,
            servings: 4,
            image: 'https://images.unsplash.com/photo-1495195134817-aeb325a55b65?w=800',
            isVerified: false,
            imageVerified: false,
            ingredients: [
                { name: '소고기 양지', amount: '300', unit: 'g', category: 'meat' },
                { name: '쌀국수', amount: '400', unit: 'g', category: 'grain' },
                { name: '양파', amount: '1', unit: '개', category: 'vegetables' },
                { name: '생강', amount: '50', unit: 'g', category: 'vegetables' },
                { name: '팔각', amount: '3', unit: '개', category: 'seasoning' },
                { name: '피쉬소스', amount: '3', unit: '큰술', category: 'seasoning' },
                { name: '숙주나물', amount: '100', unit: 'g', category: 'vegetables' },
                { name: '고수', amount: '적당량', unit: '', category: 'vegetables' }
            ],
            steps: [
                { text: '양파와 생강은 직화로 구워 향을 낸다.' },
                { text: '큰 냄비에 양지, 구운 양파, 생강, 팔각을 넣고 물을 부어 2시간 끓인다.' },
                { text: '육수를 면포로 걸러 맑게 만들고 피쉬소스로 간한다.' },
                { text: '쌀국수를 삶아 그릇에 담고 얇게 썬 고기를 올린다.' },
                { text: '뜨거운 육수를 붓고 숙주, 고수를 곁들인다.' }
            ],
            tags: ['베트남', '국물', '면', '동남아']
        },
        {
            title: '버터 치킨',
            description: '부드러운 토마토 크림 소스에 조린 인도의 대표 치킨 커리',
            category: 'indian',
            subcategory: '카레',
            difficulty: 'medium',
            prepTime: 30,
            cookTime: 30,
            servings: 4,
            image: 'https://images.unsplash.com/photo-1495195134817-aeb325a55b65?w=800',
            isVerified: false,
            imageVerified: false,
            ingredients: [
                { name: '닭다리살', amount: '500', unit: 'g', category: 'meat' },
                { name: '요거트', amount: '100', unit: 'g', category: 'dairy' },
                { name: '토마토 퓨레', amount: '200', unit: 'g', category: 'vegetables' },
                { name: '생크림', amount: '100', unit: 'ml', category: 'dairy' },
                { name: '버터', amount: '50', unit: 'g', category: 'dairy' },
                { name: '가람 마살라', amount: '1', unit: '큰술', category: 'seasoning' },
                { name: '마늘', amount: '5', unit: '쪽', category: 'vegetables' },
                { name: '생강', amount: '20', unit: 'g', category: 'vegetables' }
            ],
            steps: [
                { text: '닭고기에 요거트, 강황을 넣어 30분 재운다.' },
                { text: '재운 닭고기를 오븐이나 팬에서 노릇하게 굽는다.' },
                { text: '팬에 버터를 녹이고 다진 양파를 볶는다.' },
                { text: '마늘, 생강을 넣고 볶다가 토마토 퓨레를 넣는다.' },
                { text: '가람 마살라를 넣고 10분간 끓인다.' },
                { text: '구운 닭고기와 생크림을 넣고 약불에서 조린다.' }
            ],
            tags: ['인도', '카레', '닭', '크리미']
        },
        {
            title: '카르네 아사다 타코',
            description: '불에 구운 소고기를 넣은 정통 멕시코 타코',
            category: 'mexican',
            subcategory: '타코',
            difficulty: 'medium',
            prepTime: 30,
            cookTime: 15,
            servings: 4,
            image: 'https://images.unsplash.com/photo-1495195134817-aeb325a55b65?w=800',
            isVerified: false,
            imageVerified: false,
            ingredients: [
                { name: '소고기 플랭크 스테이크', amount: '500', unit: 'g', category: 'meat' },
                { name: '또띠아', amount: '8', unit: '장', category: 'grain' },
                { name: '라임', amount: '3', unit: '개', category: 'vegetables' },
                { name: '마늘', amount: '4', unit: '쪽', category: 'vegetables' },
                { name: '고수', amount: '한줌', unit: '', category: 'vegetables' },
                { name: '양파', amount: '1', unit: '개', category: 'vegetables' },
                { name: '쿠민', amount: '1', unit: '작은술', category: 'seasoning' }
            ],
            steps: [
                { text: '마늘, 라임즙, 쿠민, 올리브오일을 섞어 양념을 만든다.' },
                { text: '소고기에 양념을 바르고 30분 이상 재운다.' },
                { text: '강한 불에서 고기 양면을 굽는다.' },
                { text: '5분간 휴지 후 얇게 썬다.' },
                { text: '또띠아를 살짝 굽는다.' },
                { text: '또띠아에 고기, 양파, 고수를 올리고 라임을 뿌려 완성한다.' }
            ],
            tags: ['멕시코', '타코', '소고기', '정통']
        },
        {
            title: '치킨 부리토',
            description: '닭고기와 밥, 콩, 치즈를 큰 또띠아에 말아낸 멕시코 요리',
            category: 'mexican',
            subcategory: '부리토',
            difficulty: 'easy',
            prepTime: 20,
            cookTime: 20,
            servings: 4,
            image: 'https://images.unsplash.com/photo-1495195134817-aeb325a55b65?w=800',
            isVerified: false,
            imageVerified: false,
            ingredients: [
                { name: '닭가슴살', amount: '400', unit: 'g', category: 'meat' },
                { name: '대형 또띠아', amount: '4', unit: '장', category: 'grain' },
                { name: '밥', amount: '2', unit: '공기', category: 'grain' },
                { name: '검은콩', amount: '200', unit: 'g', category: 'vegetables' },
                { name: '체다치즈', amount: '150', unit: 'g', category: 'dairy' },
                { name: '살사소스', amount: '100', unit: 'g', category: 'seasoning' },
                { name: '사워크림', amount: '100', unit: 'g', category: 'dairy' }
            ],
            steps: [
                { text: '닭가슴살에 쿠민, 파프리카, 소금을 뿌려 굽는다.' },
                { text: '익은 닭고기를 잘게 찢는다.' },
                { text: '또띠아를 따뜻하게 데운다.' },
                { text: '또띠아 중앙에 밥, 닭고기, 콩, 치즈를 올린다.' },
                { text: '살사소스와 사워크림을 뿌린다.' },
                { text: '양쪽을 접고 돌돌 말아 완성한다.' }
            ],
            tags: ['멕시코', '부리토', '닭', '간편']
        },
        {
            title: '나초 수프림',
            description: '토르티야 칩 위에 다양한 토핑을 올린 멕시코식 안주',
            category: 'mexican',
            subcategory: '나초',
            difficulty: 'easy',
            prepTime: 15,
            cookTime: 10,
            servings: 4,
            image: 'https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?w=800',
            isVerified: false,
            imageVerified: false,
            ingredients: [
                { name: '토르티야 칩', amount: '200', unit: 'g', category: 'grain' },
                { name: '소고기 다짐육', amount: '200', unit: 'g', category: 'meat' },
                { name: '체다치즈', amount: '200', unit: 'g', category: 'dairy' },
                { name: '할라피뇨', amount: '50', unit: 'g', category: 'vegetables' },
                { name: '토마토', amount: '2', unit: '개', category: 'vegetables' },
                { name: '사워크림', amount: '100', unit: 'g', category: 'dairy' },
                { name: '아보카도', amount: '1', unit: '개', category: 'vegetables' }
            ],
            steps: [
                { text: '소고기를 타코 시즈닝과 함께 볶는다.' },
                { text: '토마토와 양파는 잘게 다진다.' },
                { text: '아보카도는 으깨서 과카몰리를 만든다.' },
                { text: '오븐용 접시에 칩을 깔고 치즈를 뿌린다.' },
                { text: '180도 오븐에서 치즈가 녹을 때까지 굽는다.' },
                { text: '볶은 고기, 토마토, 할라피뇨, 사워크림, 과카몰리를 올려 완성한다.' }
            ],
            tags: ['멕시코', '나초', '안주', '파티']
        },
        {
            title: '국물떡볶이',
            description: '매콤달콤한 국물이 자작한 전통 떡볶이',
            category: 'bunsik',
            subcategory: '떡볶이',
            difficulty: 'easy',
            prepTime: 10,
            cookTime: 20,
            servings: 2,
            image: 'https://images.unsplash.com/photo-1495195134817-aeb325a55b65?w=800',
            isVerified: false,
            imageVerified: false,
            ingredients: [
                { name: '떡볶이 떡', amount: '300', unit: 'g', category: 'grain' },
                { name: '어묵', amount: '2', unit: '장', category: 'seafood' },
                { name: '대파', amount: '1', unit: '대', category: 'vegetables' },
                { name: '고추장', amount: '2', unit: '큰술', category: 'seasoning' },
                { name: '고춧가루', amount: '1', unit: '큰술', category: 'seasoning' },
                { name: '설탕', amount: '1.5', unit: '큰술', category: 'seasoning' },
                { name: '물', amount: '500', unit: 'ml', category: 'other' }
            ],
            steps: [
                { text: '떡은 찬물에 10분간 담가 부드럽게 만든다.' },
                { text: '어묵은 먹기 좋은 크기로 자르고 대파는 어슷썬다.' },
                { text: '냄비에 물을 붓고 고추장, 고춧가루, 설탕을 풀어 끓인다.' },
                { text: '양념장이 끓으면 떡과 어묵을 넣고 중불에서 졸인다.' },
                { text: '떡이 부드러워지면 대파를 넣고 1분 더 끓여 완성한다.' }
            ],
            tags: ['매운', '간식', '야식', '분식']
        },
        {
            title: '참치김밥',
            description: '고소한 참치와 마요네즈가 들어간 인기 김밥',
            category: 'bunsik',
            subcategory: '김밥',
            difficulty: 'medium',
            prepTime: 30,
            cookTime: 10,
            servings: 2,
            image: 'https://images.unsplash.com/photo-1590301157890-4810ed352733?w=800',
            isVerified: false,
            imageVerified: true,
            ingredients: [
                { name: '밥', amount: '2', unit: '공기', category: 'grain' },
                { name: '김', amount: '2', unit: '장', category: 'vegetables' },
                { name: '참치캔', amount: '1', unit: '개', category: 'seafood' },
                { name: '마요네즈', amount: '2', unit: '큰술', category: 'seasoning' },
                { name: '단무지', amount: '2', unit: '줄', category: 'vegetables' },
                { name: '오이', amount: '1/2', unit: '개', category: 'vegetables' },
                { name: '당근', amount: '1/4', unit: '개', category: 'vegetables' }
            ],
            steps: [
                { text: '참치는 기름을 빼고 마요네즈와 섞는다.' },
                { text: '밥에 참기름과 소금을 넣어 양념한다.' },
                { text: '당근은 채썰어 볶고, 오이는 길게 썬다.' },
                { text: '김 위에 밥을 펴고 재료를 올려 말아준다.' },
                { text: '참기름을 바르고 먹기 좋게 썬다.' }
            ],
            tags: ['도시락', '간식', '소풍', '분식']
        },
        {
            title: '쫄면',
            description: '쫄깃한 면발에 매콤새콤한 양념장을 비벼먹는 분식집 인기 메뉴',
            category: 'bunsik',
            subcategory: '면',
            difficulty: 'easy',
            prepTime: 10,
            cookTime: 15,
            servings: 1,
            image: 'https://images.unsplash.com/photo-1617093727343-374698b1b08d?w=800',
            isVerified: false,
            imageVerified: true,
            ingredients: [
                { name: '쫄면', amount: '150', unit: 'g', category: 'grain' },
                { name: '양배추', amount: '2', unit: '장', category: 'vegetables' },
                { name: '오이', amount: '1/4', unit: '개', category: 'vegetables' },
                { name: '삶은 계란', amount: '1', unit: '개', category: 'dairy' },
                { name: '고추장', amount: '2', unit: '큰술', category: 'seasoning' },
                { name: '식초', amount: '2', unit: '큰술', category: 'seasoning' },
                { name: '설탕', amount: '1', unit: '큰술', category: 'seasoning' }
            ],
            steps: [
                { text: '쫄면은 끓는 물에 5분간 삶아 찬물에 헹군다.' },
                { text: '양배추는 채썰고 오이도 채썬다.' },
                { text: '고추장, 식초, 설탕, 참기름을 섞어 양념장을 만든다.' },
                { text: '그릇에 면, 양배추, 오이를 담고 양념장을 올린다.' },
                { text: '계란 반쪽을 올려 완성한다.' }
            ],
            tags: ['매운', '새콤', '간식', '분식']
        },
        {
            title: '소금빵',
            description: '바삭한 겉면과 버터향 가득한 일본식 소금빵',
            category: 'dessert',
            subcategory: '빵',
            difficulty: 'hard',
            prepTime: 120,
            cookTime: 15,
            servings: 8,
            image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800',
            isVerified: false,
            imageVerified: false,
            ingredients: [
                { name: '강력분', amount: '250', unit: 'g', category: 'grain' },
                { name: '버터', amount: '100', unit: 'g', category: 'dairy' },
                { name: '우유', amount: '150', unit: 'ml', category: 'dairy' },
                { name: '드라이이스트', amount: '4', unit: 'g', category: 'other' },
                { name: '설탕', amount: '20', unit: 'g', category: 'seasoning' },
                { name: '소금', amount: '5', unit: 'g', category: 'seasoning' },
                { name: '굵은 소금', amount: '약간', unit: '', category: 'seasoning' }
            ],
            steps: [
                { text: '따뜻한 우유에 이스트와 설탕을 넣어 10분간 발효시킨다.' },
                { text: '강력분, 소금을 넣고 반죽하여 1차 발효 60분.' },
                { text: '반죽을 8등분하여 삼각형으로 밀고 버터를 올려 말아준다.' },
                { text: '2차 발효 40분 후 굵은 소금을 뿌린다.' },
                { text: '190도 오븐에서 12-15분간 노릇하게 굽는다.' }
            ],
            tags: ['베이킹', '버터', '짭짤', '디저트']
        },
        {
            title: '초코케이크',
            description: '진한 초콜릿 풍미의 촉촉한 케이크',
            category: 'dessert',
            subcategory: '케이크',
            difficulty: 'medium',
            prepTime: 30,
            cookTime: 35,
            servings: 8,
            image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800',
            isVerified: false,
            imageVerified: false,
            ingredients: [
                { name: '박력분', amount: '150', unit: 'g', category: 'grain' },
                { name: '코코아파우더', amount: '50', unit: 'g', category: 'other' },
                { name: '설탕', amount: '200', unit: 'g', category: 'seasoning' },
                { name: '계란', amount: '3', unit: '개', category: 'dairy' },
                { name: '버터', amount: '100', unit: 'g', category: 'dairy' },
                { name: '우유', amount: '200', unit: 'ml', category: 'dairy' },
                { name: '다크초콜릿', amount: '100', unit: 'g', category: 'other' }
            ],
            steps: [
                { text: '버터와 초콜릿을 중탕으로 녹인다.' },
                { text: '계란과 설탕을 휘핑하여 크림상태로 만든다.' },
                { text: '박력분과 코코아파우더를 체쳐서 섞는다.' },
                { text: '우유와 녹인 초콜릿을 넣고 섞어 틀에 붓는다.' },
                { text: '170도 오븐에서 30-35분 굽고 식혀서 장식한다.' }
            ],
            tags: ['초콜릿', '생일', '파티', '디저트']
        },
        {
            title: '바닐라 아이스크림',
            description: '진한 바닐라 향이 가득한 홈메이드 아이스크림',
            category: 'dessert',
            subcategory: '아이스크림',
            difficulty: 'medium',
            prepTime: 30,
            cookTime: 240,
            servings: 6,
            image: 'https://images.unsplash.com/photo-1570197788417-0e82375c9371?w=800',
            isVerified: false,
            imageVerified: false,
            ingredients: [
                { name: '생크림', amount: '400', unit: 'ml', category: 'dairy' },
                { name: '우유', amount: '200', unit: 'ml', category: 'dairy' },
                { name: '설탕', amount: '100', unit: 'g', category: 'seasoning' },
                { name: '계란 노른자', amount: '4', unit: '개', category: 'dairy' },
                { name: '바닐라빈', amount: '1', unit: '개', category: 'seasoning' }
            ],
            steps: [
                { text: '우유에 바닐라빈을 넣고 약불에서 데운다.' },
                { text: '노른자와 설탕을 섞어 크림상태로 만든다.' },
                { text: '따뜻한 우유를 조금씩 넣으며 섞고 다시 가열하여 농도를 맞춘다.' },
                { text: '생크림을 휘핑하여 식힌 우유 혼합물에 섞는다.' },
                { text: '용기에 담아 냉동실에서 4시간 이상 얼리며 중간에 2-3회 저어준다.' }
            ],
            tags: ['달콤', '홈메이드', '여름', '디저트']
        },
        {
            title: '망고 스무디',
            description: '달콤한 망고와 요거트로 만든 트로피컬 스무디',
            category: 'drink',
            subcategory: '스무디',
            difficulty: 'easy',
            prepTime: 5,
            cookTime: 0,
            servings: 2,
            image: 'https://images.unsplash.com/photo-1546173159-315724a31696?w=800',
            isVerified: false,
            imageVerified: false,
            ingredients: [
                { name: '냉동 망고', amount: '200', unit: 'g', category: 'vegetables' },
                { name: '플레인 요거트', amount: '150', unit: 'g', category: 'dairy' },
                { name: '우유', amount: '150', unit: 'ml', category: 'dairy' },
                { name: '꿀', amount: '1', unit: '큰술', category: 'seasoning' }
            ],
            steps: [
                { text: '냉동 망고를 블렌더에 넣는다.' },
                { text: '요거트와 우유를 추가한다.' },
                { text: '꿀을 넣고 부드러워질 때까지 갈아준다.' },
                { text: '잔에 담아 바로 마신다.' }
            ],
            tags: ['음료', '건강', '여름', '간단']
        },
        {
            title: '아이스 아메리카노',
            description: '진한 에스프레소의 깔끔한 아이스 커피',
            category: 'drink',
            subcategory: '커피',
            difficulty: 'easy',
            prepTime: 3,
            cookTime: 0,
            servings: 1,
            image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800',
            isVerified: false,
            imageVerified: false,
            ingredients: [
                { name: '에스프레소', amount: '2', unit: '샷', category: 'other' },
                { name: '찬물', amount: '150', unit: 'ml', category: 'other' },
                { name: '얼음', amount: '1', unit: '컵', category: 'other' }
            ],
            steps: [
                { text: '에스프레소를 추출한다.' },
                { text: '잔에 얼음을 가득 담는다.' },
                { text: '에스프레소를 얼음 위에 붓는다.' },
                { text: '찬물을 추가하여 농도를 조절한다.' }
            ],
            tags: ['음료', '커피', '간단', '아침']
        },
        {
            title: '유자차',
            description: '향긋하고 달콤한 한국 전통 유자차',
            category: 'drink',
            subcategory: '차',
            difficulty: 'easy',
            prepTime: 3,
            cookTime: 0,
            servings: 1,
            image: 'https://images.unsplash.com/photo-1495195134817-aeb325a55b65?w=800',
            isVerified: false,
            imageVerified: false,
            ingredients: [
                { name: '유자청', amount: '2', unit: '큰술', category: 'other' },
                { name: '뜨거운 물', amount: '200', unit: 'ml', category: 'other' },
                { name: '꿀', amount: '1', unit: '작은술', category: 'seasoning' }
            ],
            steps: [
                { text: '머그컵에 유자청을 넣는다.' },
                { text: '뜨거운 물을 붓는다.' },
                { text: '잘 저어서 유자청을 풀어준다.' },
                { text: '기호에 따라 꿀을 추가한다.' }
            ],
            tags: ['음료', '차', '겨울', '따뜻']
        },
        {
            title: '데리야끼 소스',
            description: '달콤짭짤한 만능 데리야끼 소스',
            category: 'other',
            subcategory: '소스',
            difficulty: 'easy',
            prepTime: 5,
            cookTime: 10,
            servings: 10,
            image: 'https://images.unsplash.com/photo-1495195134817-aeb325a55b65?w=800',
            isVerified: false,
            imageVerified: false,
            ingredients: [
                { name: '간장', amount: '100', unit: 'ml', category: 'seasoning' },
                { name: '미림', amount: '50', unit: 'ml', category: 'seasoning' },
                { name: '청주', amount: '50', unit: 'ml', category: 'other' },
                { name: '설탕', amount: '3', unit: '큰술', category: 'seasoning' },
                { name: '생강즙', amount: '1', unit: '작은술', category: 'vegetables' }
            ],
            steps: [
                { text: '냄비에 간장, 미림, 청주를 넣는다.' },
                { text: '설탕을 넣고 중불에서 끓인다.' },
                { text: '설탕이 녹으면 약불로 줄인다.' },
                { text: '5분간 더 졸여 농도를 맞춘다.' },
                { text: '생강즙을 넣고 한번 더 끓여 완성한다.' }
            ],
            tags: ['소스', '일식', '만능', '기타']
        },
        {
            title: '버섯 리조또',
            description: '크리미한 파마산 치즈와 향긋한 버섯이 어우러진 이탈리안 쌀 요리',
            category: 'western',
            subcategory: '밥',
            difficulty: 'medium',
            prepTime: 15,
            cookTime: 35,
            servings: 2,
            image: 'https://images.unsplash.com/photo-1495195134817-aeb325a55b65?w=800',
            isVerified: false,
            imageVerified: false,
            ingredients: [
                { name: '아르보리오 쌀', amount: '200', unit: 'g', category: 'grain' },
                { name: '양송이버섯', amount: '150', unit: 'g', category: 'vegetables' },
                { name: '표고버섯', amount: '100', unit: 'g', category: 'vegetables' },
                { name: '양파', amount: '1/2', unit: '개', category: 'vegetables' },
                { name: '마늘', amount: '3', unit: '쪽', category: 'vegetables' },
                { name: '화이트 와인', amount: '100', unit: 'ml', category: 'other' },
                { name: '닭 육수', amount: '800', unit: 'ml', category: 'other' },
                { name: '파마산 치즈', amount: '50', unit: 'g', category: 'dairy' },
                { name: '버터', amount: '30', unit: 'g', category: 'dairy' },
                { name: '올리브오일', amount: '2', unit: '큰술', category: 'seasoning' }
            ],
            steps: [
                { text: '닭 육수를 냄비에 데워 따뜻하게 유지한다.' },
                { text: '버섯은 슬라이스하고, 양파와 마늘은 다진다.' },
                { text: '팬에 올리브오일을 두르고 양파를 투명해질 때까지 볶는다.' },
                { text: '마늘을 넣고 1분간 볶은 후 버섯을 넣어 숨이 죽을 때까지 볶는다.' },
                { text: '쌀을 넣고 2분간 볶아 쌀알이 투명해지게 한다.' },
                { text: '화이트 와인을 붓고 알코올이 날아갈 때까지 저어준다.' },
                { text: '따뜻한 육수를 한 국자씩 넣으며 쌀이 흡수할 때까지 계속 저어준다.' },
                { text: '불을 끄고 버터와 파마산 치즈를 넣어 크리미하게 섞는다.' }
            ],
            tags: ['크리미', '이탈리안', '버섯', '저녁']
        },
        {
            title: '해산물 그라탕',
            description: '새우, 조개, 오징어가 듬뿍 들어간 크림 소스 그라탕',
            category: 'western',
            subcategory: '밥',
            difficulty: 'medium',
            prepTime: 25,
            cookTime: 30,
            servings: 3,
            image: 'https://images.unsplash.com/photo-1495195134817-aeb325a55b65?w=800',
            isVerified: false,
            imageVerified: false,
            ingredients: [
                { name: '새우', amount: '150', unit: 'g', category: 'seafood' },
                { name: '바지락', amount: '100', unit: 'g', category: 'seafood' },
                { name: '오징어', amount: '100', unit: 'g', category: 'seafood' },
                { name: '마카로니', amount: '150', unit: 'g', category: 'grain' },
                { name: '버터', amount: '40', unit: 'g', category: 'dairy' },
                { name: '밀가루', amount: '3', unit: '큰술', category: 'grain' },
                { name: '우유', amount: '400', unit: 'ml', category: 'dairy' },
                { name: '모차렐라 치즈', amount: '150', unit: 'g', category: 'dairy' }
            ],
            steps: [
                { text: '마카로니를 삶아 건져둔다.' },
                { text: '새우는 껍질을 벗기고, 오징어는 먹기 좋게 썬다.' },
                { text: '팬에 버터를 녹이고 밀가루를 넣어 루를 만든다.' },
                { text: '우유를 조금씩 넣으며 저어 화이트소스를 만든다.' },
                { text: '해산물을 볶아 소스에 섞는다.' },
                { text: '오븐용 그릇에 담고 치즈를 올려 200도에서 15분 굽는다.' }
            ],
            tags: ['크리미', '해산물', '오븐', '치즈']
        },
        {
            title: '오코노미야키',
            description: '양배추가 듬뿍 들어간 일본식 철판 부침개',
            category: 'japanese',
            subcategory: '구이',
            difficulty: 'medium',
            prepTime: 20,
            cookTime: 20,
            servings: 2,
            image: 'https://images.unsplash.com/photo-1495195134817-aeb325a55b65?w=800',
            isVerified: false,
            imageVerified: false,
            ingredients: [
                { name: '양배추', amount: '300', unit: 'g', category: 'vegetables' },
                { name: '밀가루', amount: '100', unit: 'g', category: 'grain' },
                { name: '계란', amount: '2', unit: '개', category: 'dairy' },
                { name: '삼겹살', amount: '100', unit: 'g', category: 'meat' },
                { name: '다시마 육수', amount: '100', unit: 'ml', category: 'other' },
                { name: '오코노미 소스', amount: '3', unit: '큰술', category: 'seasoning' },
                { name: '마요네즈', amount: '2', unit: '큰술', category: 'seasoning' },
                { name: '가쓰오부시', amount: '10', unit: 'g', category: 'seafood' }
            ],
            steps: [
                { text: '양배추는 채 썬다.' },
                { text: '밀가루, 계란, 다시마 육수를 섞어 반죽을 만든다.' },
                { text: '양배추를 반죽에 넣고 가볍게 섞는다.' },
                { text: '팬에 반죽을 올리고 삼겹살을 위에 올려 굽는다.' },
                { text: '뒤집어서 양면을 노릇하게 굽는다.' },
                { text: '오코노미 소스, 마요네즈, 가쓰오부시를 올려 완성한다.' }
            ],
            tags: ['철판', '간식', '일본', '캐주얼']
        },
        {
            title: '야키소바',
            description: '쫄깃한 면과 채소를 달콤짭짤한 소스에 볶은 일본식 볶음면',
            category: 'japanese',
            subcategory: '면',
            difficulty: 'easy',
            prepTime: 15,
            cookTime: 15,
            servings: 2,
            image: 'https://images.unsplash.com/photo-1495195134817-aeb325a55b65?w=800',
            isVerified: false,
            imageVerified: false,
            ingredients: [
                { name: '야키소바 면', amount: '300', unit: 'g', category: 'grain' },
                { name: '삼겹살', amount: '100', unit: 'g', category: 'meat' },
                { name: '양배추', amount: '150', unit: 'g', category: 'vegetables' },
                { name: '양파', amount: '1/2', unit: '개', category: 'vegetables' },
                { name: '당근', amount: '1/4', unit: '개', category: 'vegetables' },
                { name: '야키소바 소스', amount: '4', unit: '큰술', category: 'seasoning' },
                { name: '가쓰오부시', amount: '10', unit: 'g', category: 'seafood' }
            ],
            steps: [
                { text: '채소는 채 썰고, 삼겹살은 한입 크기로 썬다.' },
                { text: '팬에 삼겹살을 볶는다.' },
                { text: '채소를 넣고 볶는다.' },
                { text: '면을 넣고 물을 약간 뿌려 풀어가며 볶는다.' },
                { text: '야키소바 소스를 넣고 고루 섞어 볶는다.' },
                { text: '가쓰오부시를 올려 완성한다.' }
            ],
            tags: ['면', '볶음', '일본', '간단']
        },
        {
            title: '미소라멘',
            description: '진한 미소 된장 베이스에 차슈와 면이 어우러진 일본 라멘',
            category: 'japanese',
            subcategory: '면',
            difficulty: 'hard',
            prepTime: 60,
            cookTime: 90,
            servings: 2,
            image: 'https://images.unsplash.com/photo-1591814468924-caf88d1232e1?w=800',
            isVerified: false,
            imageVerified: false,
            ingredients: [
                { name: '라멘 면', amount: '240', unit: 'g', category: 'grain' },
                { name: '돼지 등뼈', amount: '500', unit: 'g', category: 'meat' },
                { name: '삼겹살', amount: '300', unit: 'g', category: 'meat' },
                { name: '백미소', amount: '4', unit: '큰술', category: 'seasoning' },
                { name: '대파', amount: '2', unit: '대', category: 'vegetables' },
                { name: '반숙 계란', amount: '2', unit: '개', category: 'dairy' },
                { name: '숙주', amount: '100', unit: 'g', category: 'vegetables' },
                { name: '버터', amount: '20', unit: 'g', category: 'dairy' }
            ],
            steps: [
                { text: '돼지 등뼈로 육수를 2시간 끓인다.' },
                { text: '삼겹살을 간장에 재워 구워 차슈를 만든다.' },
                { text: '육수에 미소를 풀어 끓인다.' },
                { text: '라멘 면을 삶아 그릇에 담는다.' },
                { text: '육수를 붓고 차슈, 계란, 숙주, 버터를 올린다.' }
            ],
            tags: ['면', '국물', '일본', '진한맛']
        },
        {
            title: '고로케',
            description: '감자와 고기를 섞어 바삭하게 튀긴 일본식 크로켓',
            category: 'japanese',
            subcategory: '튀김',
            difficulty: 'medium',
            prepTime: 30,
            cookTime: 20,
            servings: 4,
            image: 'https://images.unsplash.com/photo-1495195134817-aeb325a55b65?w=800',
            isVerified: false,
            imageVerified: false,
            ingredients: [
                { name: '감자', amount: '500', unit: 'g', category: 'vegetables' },
                { name: '다진 소고기', amount: '150', unit: 'g', category: 'meat' },
                { name: '양파', amount: '1', unit: '개', category: 'vegetables' },
                { name: '버터', amount: '20', unit: 'g', category: 'dairy' },
                { name: '밀가루', amount: '50', unit: 'g', category: 'grain' },
                { name: '계란', amount: '2', unit: '개', category: 'dairy' },
                { name: '빵가루', amount: '100', unit: 'g', category: 'grain' }
            ],
            steps: [
                { text: '감자를 삶아 으깬다.' },
                { text: '양파와 고기를 볶아 감자에 섞는다.' },
                { text: '타원형으로 빚는다.' },
                { text: '밀가루, 계란물, 빵가루 순으로 옷을 입힌다.' },
                { text: '170도 기름에 바삭하게 튀긴다.' }
            ],
            tags: ['튀김', '간식', '일본', '도시락']
        },
        {
            title: '깐풍기',
            description: '바삭하게 튀긴 닭에 매콤달콤한 소스를 버무린 중화요리',
            category: 'chinese',
            subcategory: '튀김',
            difficulty: 'medium',
            prepTime: 30,
            cookTime: 20,
            servings: 3,
            image: 'https://images.unsplash.com/photo-1495195134817-aeb325a55b65?w=800',
            isVerified: false,
            imageVerified: false,
            ingredients: [
                { name: '닭 다리살', amount: '500', unit: 'g', category: 'meat' },
                { name: '전분', amount: '80', unit: 'g', category: 'grain' },
                { name: '건고추', amount: '10', unit: '개', category: 'vegetables' },
                { name: '마늘', amount: '5', unit: '쪽', category: 'vegetables' },
                { name: '간장', amount: '2', unit: '큰술', category: 'seasoning' },
                { name: '식초', amount: '1', unit: '큰술', category: 'seasoning' },
                { name: '설탕', amount: '2', unit: '큰술', category: 'seasoning' }
            ],
            steps: [
                { text: '닭고기를 한입 크기로 썰어 밑간한다.' },
                { text: '전분을 묻혀 바삭하게 이중 튀김한다.' },
                { text: '마늘, 건고추를 볶아 향을 낸다.' },
                { text: '간장, 식초, 설탕으로 소스를 만든다.' },
                { text: '튀긴 닭을 소스에 버무려 완성한다.' }
            ],
            tags: ['닭', '튀김', '매콤', '술안주']
        },
        {
            title: '팔보채',
            description: '해산물과 다양한 채소를 굴소스에 볶은 푸짐한 중화요리',
            category: 'chinese',
            subcategory: '볶음',
            difficulty: 'medium',
            prepTime: 30,
            cookTime: 15,
            servings: 4,
            image: 'https://images.unsplash.com/photo-1495195134817-aeb325a55b65?w=800',
            isVerified: false,
            imageVerified: false,
            ingredients: [
                { name: '새우', amount: '150', unit: 'g', category: 'seafood' },
                { name: '오징어', amount: '100', unit: 'g', category: 'seafood' },
                { name: '전복', amount: '2', unit: '개', category: 'seafood' },
                { name: '브로콜리', amount: '100', unit: 'g', category: 'vegetables' },
                { name: '양송이버섯', amount: '100', unit: 'g', category: 'vegetables' },
                { name: '당근', amount: '1/2', unit: '개', category: 'vegetables' },
                { name: '굴소스', amount: '3', unit: '큰술', category: 'seasoning' }
            ],
            steps: [
                { text: '해산물과 채소를 먹기 좋게 손질한다.' },
                { text: '해산물과 채소를 살짝 데친다.' },
                { text: '팬에 마늘, 생강을 볶아 향을 낸다.' },
                { text: '해산물과 채소를 넣고 볶는다.' },
                { text: '굴소스로 간을 맞추고 전분물로 걸쭉하게 한다.' }
            ],
            tags: ['해산물', '볶음', '고급', '접대']
        },
        {
            title: '군만두',
            description: '고기와 야채 소를 넣어 바삭하게 구운 만두',
            category: 'chinese',
            subcategory: '딤섬',
            difficulty: 'medium',
            prepTime: 45,
            cookTime: 15,
            servings: 4,
            image: 'https://images.unsplash.com/photo-1495195134817-aeb325a55b65?w=800',
            isVerified: false,
            imageVerified: false,
            ingredients: [
                { name: '만두피', amount: '30', unit: '장', category: 'grain' },
                { name: '돼지 다진고기', amount: '300', unit: 'g', category: 'meat' },
                { name: '배추', amount: '200', unit: 'g', category: 'vegetables' },
                { name: '부추', amount: '50', unit: 'g', category: 'vegetables' },
                { name: '두부', amount: '100', unit: 'g', category: 'other' },
                { name: '당면', amount: '30', unit: 'g', category: 'grain' },
                { name: '간장', amount: '1', unit: '큰술', category: 'seasoning' }
            ],
            steps: [
                { text: '배추를 다져 소금에 절여 물기를 짠다.' },
                { text: '모든 소 재료를 섞어 치댄다.' },
                { text: '만두피에 소를 올려 빚는다.' },
                { text: '팬에 기름을 두르고 만두를 굽는다.' },
                { text: '물을 넣고 뚜껑을 덮어 쪄준 후 바삭하게 마무리한다.' }
            ],
            tags: ['만두', '간식', '야식', '술안주']
        },
        {
            title: '양장피',
            description: '해파리와 각종 채소, 해산물을 겨자 소스에 곁들인 냉채',
            category: 'chinese',
            subcategory: '볶음',
            difficulty: 'medium',
            prepTime: 40,
            cookTime: 10,
            servings: 4,
            image: 'https://images.unsplash.com/photo-1495195134817-aeb325a55b65?w=800',
            isVerified: false,
            imageVerified: false,
            ingredients: [
                { name: '양장피 피', amount: '200', unit: 'g', category: 'grain' },
                { name: '해파리', amount: '100', unit: 'g', category: 'seafood' },
                { name: '새우', amount: '100', unit: 'g', category: 'seafood' },
                { name: '오징어', amount: '100', unit: 'g', category: 'seafood' },
                { name: '오이', amount: '1', unit: '개', category: 'vegetables' },
                { name: '달걀', amount: '2', unit: '개', category: 'dairy' },
                { name: '겨자', amount: '2', unit: '큰술', category: 'seasoning' }
            ],
            steps: [
                { text: '해파리는 찬물에 담가 짠맛을 뺀다.' },
                { text: '양장피, 해산물을 데쳐 식힌다.' },
                { text: '채소와 지단을 채 썬다.' },
                { text: '겨자소스를 만든다.' },
                { text: '접시에 예쁘게 담고 소스를 곁들인다.' }
            ],
            tags: ['냉채', '상큼', '여름', '손님상']
        },
        {
            title: '어묵탕',
            description: '따끈한 국물에 어묵을 끓여낸 겨울 대표 분식',
            category: 'bunsik',
            subcategory: '떡볶이',
            difficulty: 'easy',
            prepTime: 10,
            cookTime: 20,
            servings: 2,
            image: 'https://images.unsplash.com/photo-1495195134817-aeb325a55b65?w=800',
            isVerified: false,
            imageVerified: false,
            ingredients: [
                { name: '어묵', amount: '300', unit: 'g', category: 'seafood' },
                { name: '무', amount: '100', unit: 'g', category: 'vegetables' },
                { name: '대파', amount: '1', unit: '대', category: 'vegetables' },
                { name: '다시마', amount: '10', unit: 'g', category: 'seafood' },
                { name: '국간장', amount: '1', unit: '큰술', category: 'seasoning' }
            ],
            steps: [
                { text: '다시마로 육수를 낸다.' },
                { text: '무를 넣고 끓인다.' },
                { text: '어묵을 꼬치에 꿰어 넣는다.' },
                { text: '국간장으로 간을 맞춘다.' },
                { text: '대파를 넣고 마무리한다.' }
            ],
            tags: ['국물', '겨울', '간식', '따뜻']
        },
        {
            title: '모듬튀김',
            description: '야채와 고구마, 김말이를 바삭하게 튀긴 분식',
            category: 'bunsik',
            subcategory: '튀김',
            difficulty: 'medium',
            prepTime: 20,
            cookTime: 15,
            servings: 3,
            image: 'https://images.unsplash.com/photo-1495195134817-aeb325a55b65?w=800',
            isVerified: false,
            imageVerified: false,
            ingredients: [
                { name: '고구마', amount: '1', unit: '개', category: 'vegetables' },
                { name: '김말이', amount: '5', unit: '개', category: 'other' },
                { name: '오징어', amount: '1', unit: '마리', category: 'seafood' },
                { name: '고추', amount: '3', unit: '개', category: 'vegetables' },
                { name: '튀김가루', amount: '100', unit: 'g', category: 'grain' }
            ],
            steps: [
                { text: '고구마는 얇게 슬라이스한다.' },
                { text: '튀김가루를 물에 개어 반죽을 만든다.' },
                { text: '재료에 반죽을 입힌다.' },
                { text: '170도 기름에 바삭하게 튀긴다.' }
            ],
            tags: ['튀김', '간식', '바삭', '분식']
        },
        {
            title: '핫도그',
            description: '소시지에 반죽을 입혀 튀긴 길거리 간식',
            category: 'bunsik',
            subcategory: '튀김',
            difficulty: 'medium',
            prepTime: 20,
            cookTime: 10,
            servings: 4,
            image: 'https://images.unsplash.com/photo-1495195134817-aeb325a55b65?w=800',
            isVerified: false,
            imageVerified: false,
            ingredients: [
                { name: '소시지', amount: '4', unit: '개', category: 'meat' },
                { name: '핫케이크 가루', amount: '200', unit: 'g', category: 'grain' },
                { name: '우유', amount: '100', unit: 'ml', category: 'dairy' },
                { name: '계란', amount: '1', unit: '개', category: 'dairy' },
                { name: '설탕', amount: '1', unit: '큰술', category: 'seasoning' }
            ],
            steps: [
                { text: '소시지에 나무젓가락을 꽂는다.' },
                { text: '핫케이크 가루, 우유, 계란을 섞어 반죽을 만든다.' },
                { text: '소시지에 반죽을 골고루 입힌다.' },
                { text: '170도 기름에 노릇하게 튀긴다.' },
                { text: '케첩과 머스타드를 뿌린다.' }
            ],
            tags: ['간식', '길거리', '튀김', '아이들']
        },
        {
            title: '찐만두',
            description: '고기와 야채 소가 들어간 쫄깃한 만두',
            category: 'bunsik',
            subcategory: '면',
            difficulty: 'medium',
            prepTime: 40,
            cookTime: 20,
            servings: 4,
            image: 'https://images.unsplash.com/photo-1495195134817-aeb325a55b65?w=800',
            isVerified: false,
            imageVerified: false,
            ingredients: [
                { name: '만두피', amount: '20', unit: '장', category: 'grain' },
                { name: '돼지고기', amount: '200', unit: 'g', category: 'meat' },
                { name: '두부', amount: '100', unit: 'g', category: 'other' },
                { name: '김치', amount: '100', unit: 'g', category: 'vegetables' },
                { name: '부추', amount: '30', unit: 'g', category: 'vegetables' }
            ],
            steps: [
                { text: '김치는 잘게 다져 물기를 짠다.' },
                { text: '모든 소 재료를 섞어 치댄다.' },
                { text: '만두피에 소를 올려 빚는다.' },
                { text: '찜기에서 15분간 쪄낸다.' }
            ],
            tags: ['만두', '찜', '간식', '점심']
        },
        {
            title: '계란빵',
            description: '빵 반죽 위에 계란을 올려 구운 길거리 간식',
            category: 'bunsik',
            subcategory: '튀김',
            difficulty: 'easy',
            prepTime: 10,
            cookTime: 15,
            servings: 4,
            image: 'https://images.unsplash.com/photo-1495195134817-aeb325a55b65?w=800',
            isVerified: false,
            imageVerified: false,
            ingredients: [
                { name: '핫케이크 가루', amount: '200', unit: 'g', category: 'grain' },
                { name: '계란', amount: '4', unit: '개', category: 'dairy' },
                { name: '우유', amount: '100', unit: 'ml', category: 'dairy' },
                { name: '설탕', amount: '2', unit: '큰술', category: 'seasoning' },
                { name: '소금', amount: '약간', unit: '', category: 'seasoning' }
            ],
            steps: [
                { text: '핫케이크 가루, 우유, 설탕을 섞어 반죽을 만든다.' },
                { text: '틀에 반죽을 반쯤 채운다.' },
                { text: '계란을 깨서 올린다.' },
                { text: '오븐에서 15분간 굽는다.' }
            ],
            tags: ['간식', '계란', '겨울', '길거리']
        },
        {
            title: '오뎅볶음',
            description: '어묵을 매콤달콤하게 볶은 밑반찬',
            category: 'bunsik',
            subcategory: '떡볶이',
            difficulty: 'easy',
            prepTime: 10,
            cookTime: 10,
            servings: 2,
            image: 'https://images.unsplash.com/photo-1495195134817-aeb325a55b65?w=800',
            isVerified: false,
            imageVerified: false,
            ingredients: [
                { name: '어묵', amount: '200', unit: 'g', category: 'seafood' },
                { name: '양파', amount: '1/2', unit: '개', category: 'vegetables' },
                { name: '간장', amount: '2', unit: '큰술', category: 'seasoning' },
                { name: '고춧가루', amount: '1', unit: '큰술', category: 'seasoning' },
                { name: '올리고당', amount: '1', unit: '큰술', category: 'seasoning' }
            ],
            steps: [
                { text: '어묵은 먹기 좋게 썬다.' },
                { text: '양파는 채 썬다.' },
                { text: '팬에 양념장을 만들어 끓인다.' },
                { text: '어묵과 양파를 넣고 볶는다.' }
            ],
            tags: ['반찬', '매콤', '간단', '도시락']
        },
        {
            title: '마카롱',
            description: '아몬드 머랭 쿠키 사이에 크림을 채운 프랑스 디저트',
            category: 'dessert',
            subcategory: '케이크',
            difficulty: 'hard',
            prepTime: 60,
            cookTime: 15,
            servings: 20,
            image: 'https://images.unsplash.com/photo-1558326567-98ae2405596b?w=800',
            isVerified: false,
            imageVerified: false,
            ingredients: [
                { name: '아몬드 가루', amount: '150', unit: 'g', category: 'grain' },
                { name: '슈가파우더', amount: '150', unit: 'g', category: 'seasoning' },
                { name: '달걀 흰자', amount: '55', unit: 'g', category: 'dairy' },
                { name: '설탕', amount: '150', unit: 'g', category: 'seasoning' },
                { name: '버터크림', amount: '200', unit: 'g', category: 'dairy' }
            ],
            steps: [
                { text: '아몬드 가루와 슈가파우더를 체에 내린다.' },
                { text: '흰자에 설탕을 넣어 단단한 머랭을 만든다.' },
                { text: '가루와 머랭을 섞어 마카로나주한다.' },
                { text: '짤주머니로 동그랗게 짜서 말린다.' },
                { text: '150도에서 12-15분 굽는다.' },
                { text: '식힌 후 크림을 채운다.' }
            ],
            tags: ['프랑스', '달콤', '선물', '고급']
        },
        {
            title: '티라미수',
            description: '커피에 적신 레이디핑거와 마스카포네 크림의 이탈리안 디저트',
            category: 'dessert',
            subcategory: '케이크',
            difficulty: 'medium',
            prepTime: 30,
            cookTime: 0,
            servings: 6,
            image: 'https://images.unsplash.com/photo-1586040140378-b5634cb4c8fc?w=800',
            isVerified: false,
            imageVerified: false,
            ingredients: [
                { name: '레이디핑거', amount: '200', unit: 'g', category: 'grain' },
                { name: '마스카포네', amount: '500', unit: 'g', category: 'dairy' },
                { name: '에스프레소', amount: '200', unit: 'ml', category: 'other' },
                { name: '달걀', amount: '3', unit: '개', category: 'dairy' },
                { name: '설탕', amount: '100', unit: 'g', category: 'seasoning' },
                { name: '코코아 파우더', amount: '2', unit: '큰술', category: 'seasoning' }
            ],
            steps: [
                { text: '달걀 노른자와 설탕을 섞어 연한 색이 될 때까지 젓는다.' },
                { text: '마스카포네를 넣어 부드럽게 섞는다.' },
                { text: '레이디핑거를 커피에 살짝 적신다.' },
                { text: '용기에 레이디핑거와 크림을 층층이 쌓는다.' },
                { text: '냉장고에서 4시간 이상 굳힌다.' },
                { text: '코코아 파우더를 뿌려 완성한다.' }
            ],
            tags: ['이탈리안', '커피', '크리미', '파티']
        },
        {
            title: '브라우니',
            description: '진한 초콜릿 맛의 촉촉한 미국식 디저트',
            category: 'dessert',
            subcategory: '빵',
            difficulty: 'easy',
            prepTime: 15,
            cookTime: 25,
            servings: 12,
            image: 'https://images.unsplash.com/photo-1495195134817-aeb325a55b65?w=800',
            isVerified: false,
            imageVerified: false,
            ingredients: [
                { name: '다크 초콜릿', amount: '200', unit: 'g', category: 'other' },
                { name: '버터', amount: '150', unit: 'g', category: 'dairy' },
                { name: '설탕', amount: '200', unit: 'g', category: 'seasoning' },
                { name: '달걀', amount: '3', unit: '개', category: 'dairy' },
                { name: '밀가루', amount: '100', unit: 'g', category: 'grain' },
                { name: '호두', amount: '50', unit: 'g', category: 'other' }
            ],
            steps: [
                { text: '초콜릿과 버터를 중탕으로 녹인다.' },
                { text: '설탕과 달걀을 넣어 섞는다.' },
                { text: '밀가루를 체쳐 넣고 가볍게 섞는다.' },
                { text: '호두를 넣어 섞는다.' },
                { text: '180도에서 20-25분 굽는다.' }
            ],
            tags: ['초콜릿', '촉촉', '간식', '미국']
        },
        {
            title: '크레페',
            description: '얇게 구운 팬케이크에 다양한 토핑을 올린 프랑스 디저트',
            category: 'dessert',
            subcategory: '빵',
            difficulty: 'easy',
            prepTime: 10,
            cookTime: 20,
            servings: 6,
            image: 'https://images.unsplash.com/photo-1584278858536-52532423b9ea?w=800',
            isVerified: false,
            imageVerified: false,
            ingredients: [
                { name: '밀가루', amount: '200', unit: 'g', category: 'grain' },
                { name: '달걀', amount: '3', unit: '개', category: 'dairy' },
                { name: '우유', amount: '500', unit: 'ml', category: 'dairy' },
                { name: '버터', amount: '30', unit: 'g', category: 'dairy' },
                { name: '설탕', amount: '2', unit: '큰술', category: 'seasoning' },
                { name: '누텔라', amount: '적당량', unit: '', category: 'other' }
            ],
            steps: [
                { text: '밀가루, 달걀, 우유, 설탕을 섞어 반죽을 만든다.' },
                { text: '녹인 버터를 넣어 섞는다.' },
                { text: '팬에 얇게 펴서 양면을 굽는다.' },
                { text: '누텔라나 과일을 올려 접어 완성한다.' }
            ],
            tags: ['프랑스', '얇은', '달콤', '아침']
        },
        {
            title: '푸딩',
            description: '부드럽고 달콤한 카라멜 커스터드 푸딩',
            category: 'dessert',
            subcategory: '케이크',
            difficulty: 'medium',
            prepTime: 20,
            cookTime: 40,
            servings: 4,
            image: 'https://images.unsplash.com/photo-1527325678964-54921661f888?w=800',
            isVerified: false,
            imageVerified: false,
            ingredients: [
                { name: '달걀', amount: '3', unit: '개', category: 'dairy' },
                { name: '우유', amount: '400', unit: 'ml', category: 'dairy' },
                { name: '설탕', amount: '100', unit: 'g', category: 'seasoning' },
                { name: '바닐라 에센스', amount: '1', unit: '작은술', category: 'seasoning' }
            ],
            steps: [
                { text: '설탕 50g으로 카라멜을 만들어 틀에 깐다.' },
                { text: '우유와 남은 설탕을 데운다.' },
                { text: '달걀을 풀고 우유를 섞어 체에 거른다.' },
                { text: '바닐라를 넣고 틀에 붓는다.' },
                { text: '중탕으로 150도에서 40분 굽는다.' }
            ],
            tags: ['카라멜', '부드러운', '달콤', '클래식']
        },
        {
            title: '와플',
            description: '격자 무늬의 바삭한 벨기에 와플',
            category: 'dessert',
            subcategory: '빵',
            difficulty: 'easy',
            prepTime: 15,
            cookTime: 10,
            servings: 4,
            image: 'https://images.unsplash.com/photo-1562376552-0d160a2f238d?w=800',
            isVerified: false,
            imageVerified: false,
            ingredients: [
                { name: '밀가루', amount: '200', unit: 'g', category: 'grain' },
                { name: '달걀', amount: '2', unit: '개', category: 'dairy' },
                { name: '우유', amount: '200', unit: 'ml', category: 'dairy' },
                { name: '버터', amount: '50', unit: 'g', category: 'dairy' },
                { name: '베이킹파우더', amount: '1', unit: '작은술', category: 'seasoning' },
                { name: '메이플시럽', amount: '적당량', unit: '', category: 'seasoning' }
            ],
            steps: [
                { text: '밀가루와 베이킹파우더를 섞는다.' },
                { text: '달걀, 우유, 녹인 버터를 넣어 반죽을 만든다.' },
                { text: '와플기계에 반죽을 부어 굽는다.' },
                { text: '메이플시럽과 과일을 올린다.' }
            ],
            tags: ['벨기에', '바삭', '아침', '브런치']
        },
        {
            title: '에그타르트',
            description: '바삭한 파이지 안에 부드러운 커스터드를 채운 포르투갈 디저트',
            category: 'dessert',
            subcategory: '빵',
            difficulty: 'medium',
            prepTime: 30,
            cookTime: 20,
            servings: 12,
            image: 'https://images.unsplash.com/photo-1614707267537-b85aaf00c4b7?w=800',
            isVerified: false,
            imageVerified: false,
            ingredients: [
                { name: '냉동 파이지', amount: '1', unit: '장', category: 'grain' },
                { name: '달걀 노른자', amount: '4', unit: '개', category: 'dairy' },
                { name: '생크림', amount: '200', unit: 'ml', category: 'dairy' },
                { name: '설탕', amount: '80', unit: 'g', category: 'seasoning' },
                { name: '바닐라 에센스', amount: '1', unit: '작은술', category: 'seasoning' }
            ],
            steps: [
                { text: '파이지를 타르트 틀에 맞춰 깐다.' },
                { text: '생크림과 설탕을 데운다.' },
                { text: '노른자와 섞어 커스터드를 만든다.' },
                { text: '틀에 붓고 220도에서 15-20분 굽는다.' }
            ],
            tags: ['포르투갈', '커스터드', '바삭', '카페']
        },
        {
            title: '버블티',
            description: '쫀득한 타피오카 펄이 들어간 밀크티',
            category: 'drink',
            subcategory: '차',
            difficulty: 'easy',
            prepTime: 10,
            cookTime: 30,
            servings: 2,
            image: 'https://images.unsplash.com/photo-1558857563-b371033873b8?w=800',
            isVerified: false,
            imageVerified: false,
            ingredients: [
                { name: '타피오카 펄', amount: '100', unit: 'g', category: 'grain' },
                { name: '홍차', amount: '2', unit: '티백', category: 'other' },
                { name: '우유', amount: '200', unit: 'ml', category: 'dairy' },
                { name: '흑설탕', amount: '3', unit: '큰술', category: 'seasoning' }
            ],
            steps: [
                { text: '타피오카 펄을 30분간 삶는다.' },
                { text: '흑설탕 시럽에 펄을 재운다.' },
                { text: '홍차를 진하게 우린다.' },
                { text: '컵에 펄, 얼음, 홍차, 우유를 넣는다.' }
            ],
            tags: ['대만', '달콤', '쫀득', '트렌디']
        },
        {
            title: '핫초코',
            description: '진한 초콜릿과 우유로 만든 따뜻한 음료',
            category: 'drink',
            subcategory: '커피',
            difficulty: 'easy',
            prepTime: 5,
            cookTime: 5,
            servings: 2,
            image: 'https://images.unsplash.com/photo-1542990253-0d0f5be5f0ed?w=800',
            isVerified: false,
            imageVerified: false,
            ingredients: [
                { name: '우유', amount: '400', unit: 'ml', category: 'dairy' },
                { name: '다크 초콜릿', amount: '100', unit: 'g', category: 'other' },
                { name: '생크림', amount: '50', unit: 'ml', category: 'dairy' },
                { name: '마시멜로', amount: '적당량', unit: '', category: 'other' }
            ],
            steps: [
                { text: '우유를 중불에서 데운다.' },
                { text: '초콜릿을 넣어 녹인다.' },
                { text: '컵에 붓고 휘핑크림과 마시멜로를 올린다.' }
            ],
            tags: ['겨울', '달콤', '따뜻', '위로']
        },
        {
            title: '밀크쉐이크',
            description: '아이스크림과 우유를 블렌딩한 달콤한 음료',
            category: 'drink',
            subcategory: '스무디',
            difficulty: 'easy',
            prepTime: 5,
            cookTime: 0,
            servings: 2,
            image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=800',
            isVerified: false,
            imageVerified: false,
            ingredients: [
                { name: '바닐라 아이스크림', amount: '200', unit: 'g', category: 'dairy' },
                { name: '우유', amount: '200', unit: 'ml', category: 'dairy' },
                { name: '휘핑크림', amount: '50', unit: 'ml', category: 'dairy' }
            ],
            steps: [
                { text: '아이스크림과 우유를 블렌더에 넣는다.' },
                { text: '부드러워질 때까지 갈아준다.' },
                { text: '컵에 담고 휘핑크림을 올린다.' }
            ],
            tags: ['달콤', '크리미', '디저트', '여름']
        },
        {
            title: '녹차 라떼',
            description: '진한 녹차와 우유가 어우러진 부드러운 음료',
            category: 'drink',
            subcategory: '차',
            difficulty: 'easy',
            prepTime: 5,
            cookTime: 0,
            servings: 1,
            image: 'https://images.unsplash.com/photo-1495195134817-aeb325a55b65?w=800',
            isVerified: false,
            imageVerified: false,
            ingredients: [
                { name: '녹차 가루', amount: '2', unit: '작은술', category: 'other' },
                { name: '우유', amount: '200', unit: 'ml', category: 'dairy' },
                { name: '설탕', amount: '1', unit: '큰술', category: 'seasoning' },
                { name: '얼음', amount: '적당량', unit: '', category: 'other' }
            ],
            steps: [
                { text: '녹차 가루와 뜨거운 물을 섞어 녹인다.' },
                { text: '설탕을 넣어 섞는다.' },
                { text: '컵에 얼음과 우유를 넣고 녹차를 붓는다.' }
            ],
            tags: ['녹차', '건강', '카페', '부드러운']
        },
        {
            title: '자몽에이드',
            description: '새콤달콤한 자몽으로 만든 상큼한 에이드',
            category: 'drink',
            subcategory: '주스',
            difficulty: 'easy',
            prepTime: 10,
            cookTime: 0,
            servings: 2,
            image: 'https://images.unsplash.com/photo-1560508179-b2c9a3f8e92b?w=800',
            isVerified: false,
            imageVerified: false,
            ingredients: [
                { name: '자몽', amount: '1', unit: '개', category: 'vegetables' },
                { name: '설탕', amount: '2', unit: '큰술', category: 'seasoning' },
                { name: '탄산수', amount: '300', unit: 'ml', category: 'other' },
                { name: '로즈마리', amount: '1', unit: '줄기', category: 'vegetables' }
            ],
            steps: [
                { text: '자몽을 반으로 갈라 과육을 꺼낸다.' },
                { text: '설탕과 섞어 절인다.' },
                { text: '컵에 자몽과 얼음을 넣는다.' },
                { text: '탄산수를 부어 완성한다.' }
            ],
            tags: ['상큼', '비타민', '여름', '다이어트']
        },
        {
            title: '아인슈페너',
            description: '에스프레소 위에 휘핑크림을 올린 비엔나 커피',
            category: 'drink',
            subcategory: '커피',
            difficulty: 'easy',
            prepTime: 5,
            cookTime: 0,
            servings: 1,
            image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=800',
            isVerified: false,
            imageVerified: false,
            ingredients: [
                { name: '에스프레소', amount: '2', unit: '샷', category: 'other' },
                { name: '생크림', amount: '100', unit: 'ml', category: 'dairy' },
                { name: '설탕', amount: '1', unit: '큰술', category: 'seasoning' },
                { name: '얼음', amount: '적당량', unit: '', category: 'other' }
            ],
            steps: [
                { text: '생크림에 설탕을 넣어 휘핑한다.' },
                { text: '컵에 얼음과 에스프레소를 넣는다.' },
                { text: '휘핑크림을 올려 완성한다.' }
            ],
            tags: ['비엔나', '커피', '크리미', '고급']
        },
        {
            title: '미고랭',
            description: '인도네시아식 볶음면 요리',
            category: 'southeast_asian',
            subcategory: '면',
            difficulty: 'easy',
            prepTime: 15,
            cookTime: 10,
            servings: 2,
            image: 'https://images.unsplash.com/photo-1495195134817-aeb325a55b65?w=800',
            isVerified: false,
            imageVerified: false,
            ingredients: [
                { name: '인스턴트 면', amount: '200', unit: 'g', category: 'grain' },
                { name: '양배추', amount: '100', unit: 'g', category: 'vegetables' },
                { name: '당근', amount: '50', unit: 'g', category: 'vegetables' },
                { name: '케찹마니스', amount: '2', unit: '큰술', category: 'seasoning' },
                { name: '간장', amount: '1', unit: '큰술', category: 'seasoning' }
            ],
            steps: [
                { text: '면을 삶아 건진다.' },
                { text: '채소를 채 썰어 볶는다.' },
                { text: '면을 넣고 양념을 넣어 볶는다.' }
            ],
            tags: ['인도네시아', '면', '볶음', '간단']
        },
        {
            title: '사테',
            description: '땅콩 소스를 곁들인 인도네시아 꼬치구이',
            category: 'southeast_asian',
            subcategory: '밥',
            difficulty: 'medium',
            prepTime: 30,
            cookTime: 15,
            servings: 4,
            image: 'https://images.unsplash.com/photo-1495195134817-aeb325a55b65?w=800',
            isVerified: false,
            imageVerified: false,
            ingredients: [
                { name: '닭가슴살', amount: '400', unit: 'g', category: 'meat' },
                { name: '땅콩버터', amount: '100', unit: 'g', category: 'other' },
                { name: '간장', amount: '2', unit: '큰술', category: 'seasoning' },
                { name: '라임', amount: '1', unit: '개', category: 'vegetables' },
                { name: '코코넛밀크', amount: '100', unit: 'ml', category: 'dairy' }
            ],
            steps: [
                { text: '닭고기를 한입 크기로 썰어 꼬치에 꿴다.' },
                { text: '간장과 양념에 재운다.' },
                { text: '그릴에 노릇하게 굽는다.' },
                { text: '땅콩버터 소스를 곁들인다.' }
            ],
            tags: ['인도네시아', '꼬치', '땅콩', '바베큐']
        },
        {
            title: '락사',
            description: '코코넛 커리 베이스의 말레이시아 면 요리',
            category: 'southeast_asian',
            subcategory: '국물',
            difficulty: 'medium',
            prepTime: 20,
            cookTime: 30,
            servings: 2,
            image: 'https://images.unsplash.com/photo-1495195134817-aeb325a55b65?w=800',
            isVerified: false,
            imageVerified: false,
            ingredients: [
                { name: '쌀국수', amount: '200', unit: 'g', category: 'grain' },
                { name: '코코넛밀크', amount: '400', unit: 'ml', category: 'dairy' },
                { name: '새우', amount: '150', unit: 'g', category: 'seafood' },
                { name: '커리 페이스트', amount: '3', unit: '큰술', category: 'seasoning' },
                { name: '숙주', amount: '100', unit: 'g', category: 'vegetables' }
            ],
            steps: [
                { text: '쌀국수를 삶아 건진다.' },
                { text: '커리 페이스트를 볶아 향을 낸다.' },
                { text: '코코넛밀크를 넣고 끓인다.' },
                { text: '새우를 넣고 익힌다.' },
                { text: '면 위에 국물을 붓고 숙주를 올린다.' }
            ],
            tags: ['말레이시아', '커리', '면', '국물']
        },
        {
            title: '반미',
            description: '바삭한 바게트에 고기와 채소를 넣은 베트남 샌드위치',
            category: 'southeast_asian',
            subcategory: '밥',
            difficulty: 'easy',
            prepTime: 20,
            cookTime: 10,
            servings: 2,
            image: 'https://images.unsplash.com/photo-1600688640154-9619e002df30?w=800',
            isVerified: false,
            imageVerified: false,
            ingredients: [
                { name: '바게트', amount: '2', unit: '개', category: 'grain' },
                { name: '돼지고기', amount: '200', unit: 'g', category: 'meat' },
                { name: '오이', amount: '1', unit: '개', category: 'vegetables' },
                { name: '당근', amount: '1', unit: '개', category: 'vegetables' },
                { name: '고수', amount: '적당량', unit: '', category: 'vegetables' },
                { name: '피쉬소스', amount: '1', unit: '큰술', category: 'seasoning' }
            ],
            steps: [
                { text: '돼지고기를 양념에 재워 굽는다.' },
                { text: '당근과 오이를 채 썰어 피클로 만든다.' },
                { text: '바게트를 반으로 갈라 굽는다.' },
                { text: '고기, 채소, 고수를 넣어 완성한다.' }
            ],
            tags: ['베트남', '샌드위치', '바삭', '상큼']
        },
        {
            title: '분짜',
            description: '숯불 돼지고기와 쌀국수를 느억맘 소스에 찍어 먹는 베트남 요리',
            category: 'southeast_asian',
            subcategory: '면',
            difficulty: 'medium',
            prepTime: 30,
            cookTime: 20,
            servings: 2,
            image: 'https://images.unsplash.com/photo-1495195134817-aeb325a55b65?w=800',
            isVerified: false,
            imageVerified: false,
            ingredients: [
                { name: '쌀국수', amount: '200', unit: 'g', category: 'grain' },
                { name: '돼지고기', amount: '300', unit: 'g', category: 'meat' },
                { name: '느억맘', amount: '3', unit: '큰술', category: 'seasoning' },
                { name: '라임', amount: '1', unit: '개', category: 'vegetables' },
                { name: '고수', amount: '적당량', unit: '', category: 'vegetables' }
            ],
            steps: [
                { text: '돼지고기를 양념에 재운다.' },
                { text: '숯불이나 팬에 구워 낸다.' },
                { text: '쌀국수를 삶아 찬물에 헹군다.' },
                { text: '느억맘 소스를 만든다.' },
                { text: '면, 고기, 채소를 소스에 찍어 먹는다.' }
            ],
            tags: ['베트남', '숯불', '면', '느억맘']
        },
        {
            title: '껌쏘이',
            description: '태국식 망고 찹쌀밥 디저트',
            category: 'southeast_asian',
            subcategory: '밥',
            difficulty: 'easy',
            prepTime: 30,
            cookTime: 30,
            servings: 4,
            image: 'https://images.unsplash.com/photo-1495195134817-aeb325a55b65?w=800',
            isVerified: false,
            imageVerified: false,
            ingredients: [
                { name: '찹쌀', amount: '200', unit: 'g', category: 'grain' },
                { name: '망고', amount: '2', unit: '개', category: 'vegetables' },
                { name: '코코넛밀크', amount: '200', unit: 'ml', category: 'dairy' },
                { name: '설탕', amount: '3', unit: '큰술', category: 'seasoning' },
                { name: '소금', amount: '약간', unit: '', category: 'seasoning' }
            ],
            steps: [
                { text: '찹쌀을 불려 찐다.' },
                { text: '코코넛밀크에 설탕, 소금을 넣고 데운다.' },
                { text: '찹쌀에 코코넛밀크를 섞는다.' },
                { text: '망고를 슬라이스해서 곁들인다.' }
            ],
            tags: ['태국', '디저트', '망고', '달콤']
        },
        {
            title: '솜땀',
            description: '매콤새콤한 태국 파파야 샐러드',
            category: 'southeast_asian',
            subcategory: '밥',
            difficulty: 'easy',
            prepTime: 20,
            cookTime: 0,
            servings: 2,
            image: 'https://images.unsplash.com/photo-1623689046286-01bd6d3bce52?w=800',
            isVerified: false,
            imageVerified: false,
            ingredients: [
                { name: '그린 파파야', amount: '300', unit: 'g', category: 'vegetables' },
                { name: '토마토', amount: '2', unit: '개', category: 'vegetables' },
                { name: '땅콩', amount: '30', unit: 'g', category: 'other' },
                { name: '피쉬소스', amount: '2', unit: '큰술', category: 'seasoning' },
                { name: '라임', amount: '1', unit: '개', category: 'vegetables' },
                { name: '고추', amount: '3', unit: '개', category: 'vegetables' }
            ],
            steps: [
                { text: '파파야를 채 썬다.' },
                { text: '절구에 고추, 마늘을 찧는다.' },
                { text: '피쉬소스, 라임즙, 설탕을 넣어 드레싱을 만든다.' },
                { text: '파파야와 토마토를 버무린다.' },
                { text: '땅콩을 뿌려 완성한다.' }
            ],
            tags: ['태국', '샐러드', '매콤', '상큼']
        },
        {
            title: '렌당',
            description: '코코넛 밀크에 천천히 조린 인도네시아 소고기 요리',
            category: 'southeast_asian',
            subcategory: '밥',
            difficulty: 'hard',
            prepTime: 30,
            cookTime: 180,
            servings: 6,
            image: 'https://images.unsplash.com/photo-1495195134817-aeb325a55b65?w=800',
            isVerified: false,
            imageVerified: false,
            ingredients: [
                { name: '소고기', amount: '1', unit: 'kg', category: 'meat' },
                { name: '코코넛밀크', amount: '800', unit: 'ml', category: 'dairy' },
                { name: '렌당 페이스트', amount: '100', unit: 'g', category: 'seasoning' },
                { name: '레몬그라스', amount: '2', unit: '줄기', category: 'vegetables' }
            ],
            steps: [
                { text: '소고기를 큼직하게 썬다.' },
                { text: '렌당 페이스트를 볶아 향을 낸다.' },
                { text: '코코넛밀크와 고기를 넣고 끓인다.' },
                { text: '약불에서 3시간 천천히 조린다.' }
            ],
            tags: ['인도네시아', '소고기', '코코넛', '진한맛']
        },
        {
            title: '사모사',
            description: '감자와 완두콩이 들어간 인도 튀김 만두',
            category: 'indian',
            subcategory: '빵',
            difficulty: 'medium',
            prepTime: 40,
            cookTime: 20,
            servings: 8,
            image: 'https://images.unsplash.com/photo-1601050690117-94f5f6fa8bd7?w=800',
            isVerified: false,
            imageVerified: false,
            ingredients: [
                { name: '밀가루', amount: '200', unit: 'g', category: 'grain' },
                { name: '감자', amount: '300', unit: 'g', category: 'vegetables' },
                { name: '완두콩', amount: '100', unit: 'g', category: 'vegetables' },
                { name: '가람마살라', amount: '1', unit: '작은술', category: 'seasoning' },
                { name: '커민', amount: '1', unit: '작은술', category: 'seasoning' }
            ],
            steps: [
                { text: '밀가루로 반죽을 만들어 휴지시킨다.' },
                { text: '감자를 삶아 으깨고 양념한다.' },
                { text: '반죽을 펴서 소를 넣어 삼각형으로 접는다.' },
                { text: '170도 기름에 바삭하게 튀긴다.' }
            ],
            tags: ['인도', '튀김', '감자', '간식']
        },
        {
            title: '팔락 파니르',
            description: '시금치 소스에 인도 치즈를 넣은 채식 커리',
            category: 'indian',
            subcategory: '카레',
            difficulty: 'medium',
            prepTime: 20,
            cookTime: 30,
            servings: 4,
            image: 'https://images.unsplash.com/photo-1495195134817-aeb325a55b65?w=800',
            isVerified: false,
            imageVerified: false,
            ingredients: [
                { name: '시금치', amount: '500', unit: 'g', category: 'vegetables' },
                { name: '파니르', amount: '200', unit: 'g', category: 'dairy' },
                { name: '양파', amount: '1', unit: '개', category: 'vegetables' },
                { name: '마늘', amount: '4', unit: '쪽', category: 'vegetables' },
                { name: '생크림', amount: '100', unit: 'ml', category: 'dairy' },
                { name: '가람마살라', amount: '1', unit: '작은술', category: 'seasoning' }
            ],
            steps: [
                { text: '시금치를 데쳐 갈아둔다.' },
                { text: '양파, 마늘을 볶아 향을 낸다.' },
                { text: '시금치 퓨레와 양념을 넣고 끓인다.' },
                { text: '파니르를 넣고 생크림을 더한다.' }
            ],
            tags: ['인도', '채식', '시금치', '치즈']
        },
        {
            title: '달',
            description: '렌틸콩으로 만든 인도 전통 수프',
            category: 'indian',
            subcategory: '카레',
            difficulty: 'easy',
            prepTime: 10,
            cookTime: 40,
            servings: 4,
            image: 'https://images.unsplash.com/photo-1495195134817-aeb325a55b65?w=800',
            isVerified: false,
            imageVerified: false,
            ingredients: [
                { name: '렌틸콩', amount: '200', unit: 'g', category: 'grain' },
                { name: '양파', amount: '1', unit: '개', category: 'vegetables' },
                { name: '토마토', amount: '2', unit: '개', category: 'vegetables' },
                { name: '강황', amount: '1', unit: '작은술', category: 'seasoning' },
                { name: '커민', amount: '1', unit: '작은술', category: 'seasoning' }
            ],
            steps: [
                { text: '렌틸콩을 씻어 물에 끓인다.' },
                { text: '양파와 토마토를 볶는다.' },
                { text: '양념을 넣고 콩과 함께 끓인다.' },
                { text: '부드러워질 때까지 조린다.' }
            ],
            tags: ['인도', '채식', '건강', '수프']
        },
        {
            title: '차이',
            description: '향신료가 들어간 인도식 밀크티',
            category: 'indian',
            subcategory: '빵',
            difficulty: 'easy',
            prepTime: 5,
            cookTime: 10,
            servings: 2,
            image: 'https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=800',
            isVerified: false,
            imageVerified: false,
            ingredients: [
                { name: '홍차', amount: '2', unit: '큰술', category: 'other' },
                { name: '우유', amount: '300', unit: 'ml', category: 'dairy' },
                { name: '생강', amount: '1', unit: '조각', category: 'vegetables' },
                { name: '계피', amount: '1', unit: '조각', category: 'seasoning' },
                { name: '카다몬', amount: '2', unit: '개', category: 'seasoning' },
                { name: '설탕', amount: '2', unit: '큰술', category: 'seasoning' }
            ],
            steps: [
                { text: '물에 향신료를 넣고 끓인다.' },
                { text: '홍차를 넣어 우린다.' },
                { text: '우유와 설탕을 넣고 끓인다.' },
                { text: '체에 걸러 완성한다.' }
            ],
            tags: ['인도', '음료', '향신료', '따뜻']
        },
        {
            title: '라씨',
            description: '요거트로 만든 인도 전통 음료',
            category: 'indian',
            subcategory: '빵',
            difficulty: 'easy',
            prepTime: 5,
            cookTime: 0,
            servings: 2,
            image: 'https://images.unsplash.com/photo-1626078437693-c4e7bb1c5f08?w=800',
            isVerified: false,
            imageVerified: false,
            ingredients: [
                { name: '플레인 요거트', amount: '300', unit: 'g', category: 'dairy' },
                { name: '우유', amount: '100', unit: 'ml', category: 'dairy' },
                { name: '설탕', amount: '2', unit: '큰술', category: 'seasoning' },
                { name: '카다몬', amount: '약간', unit: '', category: 'seasoning' }
            ],
            steps: [
                { text: '요거트와 우유를 블렌더에 넣는다.' },
                { text: '설탕과 카다몬을 넣고 갈아준다.' },
                { text: '차갑게 서빙한다.' }
            ],
            tags: ['인도', '음료', '요거트', '시원']
        },
        {
            title: '비리야니',
            description: '향신료와 고기가 어우러진 인도식 혼합밥',
            category: 'indian',
            subcategory: '밥',
            difficulty: 'hard',
            prepTime: 40,
            cookTime: 60,
            servings: 6,
            image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800',
            isVerified: false,
            imageVerified: false,
            ingredients: [
                { name: '바스마티 쌀', amount: '400', unit: 'g', category: 'grain' },
                { name: '닭고기', amount: '500', unit: 'g', category: 'meat' },
                { name: '요거트', amount: '200', unit: 'g', category: 'dairy' },
                { name: '양파', amount: '2', unit: '개', category: 'vegetables' },
                { name: '비리야니 마살라', amount: '2', unit: '큰술', category: 'seasoning' },
                { name: '사프란', amount: '약간', unit: '', category: 'seasoning' }
            ],
            steps: [
                { text: '닭고기를 요거트와 양념에 재운다.' },
                { text: '쌀을 70% 익혀 건진다.' },
                { text: '양파를 튀겨둔다.' },
                { text: '고기와 쌀을 층층이 쌓아 찐다.' }
            ],
            tags: ['인도', '밥', '향신료', '고급']
        },
        {
            title: '코르마',
            description: '크리미한 캐슈넛 소스의 인도 카레',
            category: 'indian',
            subcategory: '카레',
            difficulty: 'medium',
            prepTime: 20,
            cookTime: 40,
            servings: 4,
            image: 'https://images.unsplash.com/photo-1495195134817-aeb325a55b65?w=800',
            isVerified: false,
            imageVerified: false,
            ingredients: [
                { name: '닭고기', amount: '500', unit: 'g', category: 'meat' },
                { name: '캐슈넛', amount: '100', unit: 'g', category: 'other' },
                { name: '요거트', amount: '150', unit: 'g', category: 'dairy' },
                { name: '양파', amount: '2', unit: '개', category: 'vegetables' },
                { name: '생크림', amount: '100', unit: 'ml', category: 'dairy' },
                { name: '가람마살라', amount: '1', unit: '큰술', category: 'seasoning' }
            ],
            steps: [
                { text: '캐슈넛을 불려 갈아 페이스트를 만든다.' },
                { text: '양파를 볶아 닭고기를 넣는다.' },
                { text: '캐슈 페이스트와 요거트를 넣고 끓인다.' },
                { text: '생크림을 넣어 마무리한다.' }
            ],
            tags: ['인도', '카레', '크리미', '부드러운']
        },
        {
            title: '로티',
            description: '인도식 통밀 플랫브레드',
            category: 'indian',
            subcategory: '빵',
            difficulty: 'easy',
            prepTime: 30,
            cookTime: 15,
            servings: 8,
            image: 'https://images.unsplash.com/photo-1495195134817-aeb325a55b65?w=800',
            isVerified: false,
            imageVerified: false,
            ingredients: [
                { name: '통밀가루', amount: '200', unit: 'g', category: 'grain' },
                { name: '물', amount: '120', unit: 'ml', category: 'other' },
                { name: '소금', amount: '약간', unit: '', category: 'seasoning' }
            ],
            steps: [
                { text: '밀가루와 소금, 물을 섞어 반죽한다.' },
                { text: '30분간 휴지시킨다.' },
                { text: '얇게 밀어 펴준다.' },
                { text: '달군 팬에 양면을 굽는다.' }
            ],
            tags: ['인도', '빵', '기본', '채식']
        },
        {
            title: '파코라',
            description: '채소를 병아리콩 반죽에 튀긴 인도 튀김',
            category: 'indian',
            subcategory: '빵',
            difficulty: 'easy',
            prepTime: 15,
            cookTime: 15,
            servings: 4,
            image: 'https://images.unsplash.com/photo-1495195134817-aeb325a55b65?w=800',
            isVerified: false,
            imageVerified: false,
            ingredients: [
                { name: '병아리콩 가루', amount: '150', unit: 'g', category: 'grain' },
                { name: '양파', amount: '2', unit: '개', category: 'vegetables' },
                { name: '감자', amount: '1', unit: '개', category: 'vegetables' },
                { name: '고추', amount: '2', unit: '개', category: 'vegetables' },
                { name: '강황', amount: '1/2', unit: '작은술', category: 'seasoning' }
            ],
            steps: [
                { text: '채소를 얇게 슬라이스한다.' },
                { text: '병아리콩 가루와 양념으로 반죽을 만든다.' },
                { text: '채소에 반죽을 입힌다.' },
                { text: '바삭하게 튀긴다.' }
            ],
            tags: ['인도', '튀김', '채식', '간식']
        },
        {
            title: '케사디아',
            description: '치즈가 듬뿍 들어간 멕시코 토르티야 요리',
            category: 'mexican',
            subcategory: '타코',
            difficulty: 'easy',
            prepTime: 10,
            cookTime: 10,
            servings: 2,
            image: 'https://images.unsplash.com/photo-1618040996337-56904b7850b9?w=800',
            isVerified: false,
            imageVerified: false,
            ingredients: [
                { name: '플라워 토르티야', amount: '4', unit: '장', category: 'grain' },
                { name: '체다 치즈', amount: '200', unit: 'g', category: 'dairy' },
                { name: '닭가슴살', amount: '150', unit: 'g', category: 'meat' },
                { name: '양파', amount: '1/2', unit: '개', category: 'vegetables' },
                { name: '피망', amount: '1', unit: '개', category: 'vegetables' }
            ],
            steps: [
                { text: '닭가슴살을 익혀 찢는다.' },
                { text: '채소를 볶는다.' },
                { text: '토르티야에 치즈와 재료를 올려 접는다.' },
                { text: '팬에 양면을 노릇하게 굽는다.' }
            ],
            tags: ['멕시코', '치즈', '간단', '간식']
        },
        {
            title: '엔칠라다',
            description: '고기를 채운 토르티야에 소스를 뿌려 구운 멕시코 요리',
            category: 'mexican',
            subcategory: '타코',
            difficulty: 'medium',
            prepTime: 30,
            cookTime: 25,
            servings: 4,
            image: 'https://images.unsplash.com/photo-1534352956036-cd81e27fed21?w=800',
            isVerified: false,
            imageVerified: false,
            ingredients: [
                { name: '콘 토르티야', amount: '8', unit: '장', category: 'grain' },
                { name: '닭고기', amount: '400', unit: 'g', category: 'meat' },
                { name: '엔칠라다 소스', amount: '400', unit: 'ml', category: 'seasoning' },
                { name: '체다 치즈', amount: '200', unit: 'g', category: 'dairy' },
                { name: '사워크림', amount: '100', unit: 'ml', category: 'dairy' }
            ],
            steps: [
                { text: '닭고기를 삶아 찢는다.' },
                { text: '토르티야에 닭고기를 넣어 만다.' },
                { text: '오븐용 그릇에 담고 소스를 붓는다.' },
                { text: '치즈를 올려 오븐에서 20분 굽는다.' }
            ],
            tags: ['멕시코', '오븐', '치즈', '매콤']
        },
        {
            title: '파히타',
            description: '구운 고기와 채소를 토르티야에 싸 먹는 멕시코 요리',
            category: 'mexican',
            subcategory: '타코',
            difficulty: 'easy',
            prepTime: 20,
            cookTime: 15,
            servings: 4,
            image: 'https://images.unsplash.com/photo-1625164274792-35c9e0ed091b?w=800',
            isVerified: false,
            imageVerified: false,
            ingredients: [
                { name: '소고기', amount: '400', unit: 'g', category: 'meat' },
                { name: '피망', amount: '2', unit: '개', category: 'vegetables' },
                { name: '양파', amount: '1', unit: '개', category: 'vegetables' },
                { name: '토르티야', amount: '8', unit: '장', category: 'grain' },
                { name: '라임', amount: '1', unit: '개', category: 'vegetables' },
                { name: '파히타 시즈닝', amount: '2', unit: '큰술', category: 'seasoning' }
            ],
            steps: [
                { text: '소고기를 시즈닝에 재운다.' },
                { text: '채소를 굵게 채 썬다.' },
                { text: '팬에 고기와 채소를 볶는다.' },
                { text: '토르티야에 싸서 먹는다.' }
            ],
            tags: ['멕시코', '구이', '채소', '캐주얼']
        },
        {
            title: '칠리콘카르네',
            description: '콩과 고기를 매콤하게 조린 멕시코 스튜',
            category: 'mexican',
            subcategory: '밥',
            difficulty: 'easy',
            prepTime: 15,
            cookTime: 45,
            servings: 6,
            image: 'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=800',
            isVerified: false,
            imageVerified: false,
            ingredients: [
                { name: '소고기 다짐육', amount: '500', unit: 'g', category: 'meat' },
                { name: '강낭콩', amount: '400', unit: 'g', category: 'vegetables' },
                { name: '토마토 소스', amount: '400', unit: 'ml', category: 'seasoning' },
                { name: '양파', amount: '1', unit: '개', category: 'vegetables' },
                { name: '칠리파우더', amount: '2', unit: '큰술', category: 'seasoning' },
                { name: '커민', amount: '1', unit: '큰술', category: 'seasoning' }
            ],
            steps: [
                { text: '양파를 다져 볶는다.' },
                { text: '다짐육을 넣어 볶는다.' },
                { text: '토마토 소스와 양념을 넣는다.' },
                { text: '강낭콩을 넣고 끓인다.' },
                { text: '40분간 약불에서 조린다.' }
            ],
            tags: ['멕시코', '스튜', '매콤', '콩']
        },
        {
            title: '또르티야',
            description: '옥수수나 밀가루로 만든 멕시코 전통 빵',
            category: 'mexican',
            subcategory: '타코',
            difficulty: 'easy',
            prepTime: 30,
            cookTime: 15,
            servings: 8,
            image: 'https://images.unsplash.com/photo-1495195134817-aeb325a55b65?w=800',
            isVerified: false,
            imageVerified: false,
            ingredients: [
                { name: '밀가루', amount: '250', unit: 'g', category: 'grain' },
                { name: '베이킹파우더', amount: '1', unit: '작은술', category: 'seasoning' },
                { name: '소금', amount: '1/2', unit: '작은술', category: 'seasoning' },
                { name: '라드', amount: '50', unit: 'g', category: 'other' },
                { name: '따뜻한 물', amount: '150', unit: 'ml', category: 'other' }
            ],
            steps: [
                { text: '밀가루, 베이킹파우더, 소금을 섞는다.' },
                { text: '라드를 넣어 비빈다.' },
                { text: '물을 넣어 반죽해 휴지시킨다.' },
                { text: '얇게 밀어 팬에 굽는다.' }
            ],
            tags: ['멕시코', '빵', '기본', '수제']
        },
        {
            title: '살사',
            description: '신선한 토마토와 고추로 만든 멕시코 소스',
            category: 'mexican',
            subcategory: '나초',
            difficulty: 'easy',
            prepTime: 15,
            cookTime: 0,
            servings: 4,
            image: 'https://images.unsplash.com/photo-1541658016709-82535e94bc69?w=800',
            isVerified: false,
            imageVerified: false,
            ingredients: [
                { name: '토마토', amount: '4', unit: '개', category: 'vegetables' },
                { name: '양파', amount: '1/2', unit: '개', category: 'vegetables' },
                { name: '할라피뇨', amount: '1', unit: '개', category: 'vegetables' },
                { name: '고수', amount: '적당량', unit: '', category: 'vegetables' },
                { name: '라임', amount: '1', unit: '개', category: 'vegetables' }
            ],
            steps: [
                { text: '토마토를 깍둑 썬다.' },
                { text: '양파와 할라피뇨를 잘게 다진다.' },
                { text: '고수를 썬다.' },
                { text: '모든 재료를 섞고 라임즙을 넣는다.' }
            ],
            tags: ['멕시코', '소스', '상큼', '매콤']
        },
        {
            title: '엘로테',
            description: '마요네즈와 치즈를 바른 멕시코 길거리 옥수수',
            category: 'mexican',
            subcategory: '나초',
            difficulty: 'easy',
            prepTime: 10,
            cookTime: 15,
            servings: 4,
            image: 'https://images.unsplash.com/photo-1495195134817-aeb325a55b65?w=800',
            isVerified: false,
            imageVerified: false,
            ingredients: [
                { name: '옥수수', amount: '4', unit: '개', category: 'vegetables' },
                { name: '마요네즈', amount: '100', unit: 'g', category: 'seasoning' },
                { name: '코티하 치즈', amount: '50', unit: 'g', category: 'dairy' },
                { name: '칠리파우더', amount: '1', unit: '작은술', category: 'seasoning' },
                { name: '라임', amount: '1', unit: '개', category: 'vegetables' }
            ],
            steps: [
                { text: '옥수수를 굽거나 삶는다.' },
                { text: '마요네즈를 바른다.' },
                { text: '치즈와 칠리파우더를 뿌린다.' },
                { text: '라임을 뿌려 완성한다.' }
            ],
            tags: ['멕시코', '길거리', '옥수수', '간식']
        },
        {
            title: '추로스',
            description: '설탕과 계피를 뿌린 멕시코 튀김 과자',
            category: 'mexican',
            subcategory: '나초',
            difficulty: 'medium',
            prepTime: 15,
            cookTime: 15,
            servings: 6,
            image: 'https://images.unsplash.com/photo-1626198226928-85bcfcdf5938?w=800',
            isVerified: false,
            imageVerified: false,
            ingredients: [
                { name: '밀가루', amount: '150', unit: 'g', category: 'grain' },
                { name: '버터', amount: '50', unit: 'g', category: 'dairy' },
                { name: '설탕', amount: '100', unit: 'g', category: 'seasoning' },
                { name: '계피가루', amount: '1', unit: '작은술', category: 'seasoning' },
                { name: '달걀', amount: '1', unit: '개', category: 'dairy' }
            ],
            steps: [
                { text: '물, 버터, 소금을 끓인다.' },
                { text: '밀가루를 넣어 반죽을 만든다.' },
                { text: '달걀을 넣어 섞는다.' },
                { text: '별 깍지로 짜서 튀긴다.' },
                { text: '설탕과 계피를 뿌린다.' }
            ],
            tags: ['멕시코', '디저트', '달콤', '튀김']
        },
        {
            title: '초리소 타코',
            description: '매콤한 초리소 소시지를 넣은 멕시코 타코',
            category: 'mexican',
            subcategory: '타코',
            difficulty: 'easy',
            prepTime: 15,
            cookTime: 15,
            servings: 4,
            image: 'https://images.unsplash.com/photo-1495195134817-aeb325a55b65?w=800',
            isVerified: false,
            imageVerified: false,
            ingredients: [
                { name: '초리소', amount: '300', unit: 'g', category: 'meat' },
                { name: '토르티야', amount: '8', unit: '장', category: 'grain' },
                { name: '양파', amount: '1', unit: '개', category: 'vegetables' },
                { name: '고수', amount: '적당량', unit: '', category: 'vegetables' },
                { name: '라임', amount: '1', unit: '개', category: 'vegetables' }
            ],
            steps: [
                { text: '초리소를 잘게 부숴 볶는다.' },
                { text: '양파를 다져 함께 볶는다.' },
                { text: '토르티야를 데운다.' },
                { text: '초리소를 올리고 고수와 라임을 곁들인다.' }
            ],
            tags: ['멕시코', '타코', '매콤', '간단']
        }
    ],

    /**
     * 초기 데이터 삽입
     */
    async seed() {
        console.log('Starting to seed recipes...');

        let count = 0;
        for (const recipe of this.recipes) {
            try {
                await db.addRecipe(recipe);
                count++;
                console.log(`Added: ${recipe.title}`);
            } catch (error) {
                console.error(`Failed to add ${recipe.title}:`, error);
            }
        }

        console.log(`Seeding completed! Added ${count} recipes.`);
        Utils.showToast(`${count}개의 레시피가 추가되었습니다!`, 'success');
    }
};
