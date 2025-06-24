[33m407112e[m[33m ([m[1;36mHEAD -> [m[1;32mmain[m[33m, [m[1;31morigin/main[m[33m, [m[1;31morigin/HEAD[m[33m)[m change product structure FE/BE by removing stock,quantity and image
[33m504fec5[m clean code
[33m07d641c[m UI changes for cart page
[33mc8216b7[m product can be deleted now from admin , but even the product that has colors.Related images too in specifil folder
[33mb68f6cc[m user can now send email to admin from contact page
[33mfed5dc8[m UI changes for checkout and email changed after user have purchased the product
[33md18867e[m UI changes for cart page in case it is empty and user visit it
[33md4de0c2[m UI changes
[33mcbd2246[m fix for category and product on edit modal , submit button now is enabled
[33m50b16b4[m removed console messages
[33mec789f4[m bug fix for product creating and update on admin dashboard
[33m0e51a53[m changes in pdf generated when user buy
[33mf2ab476[m admin can see each order now,updated the user entity table
[33mf314896[m fixex for pdf file generated when user buy
[33m5f41418[m feature: use can select color version for the product
[33m056d173[m feature:search in home for category
[33m0ff5d6a[m style changes in pdf invoice
[33m26a331e[m add pdf feature , user receive the invoice with pdf in email
[33m0c84125[m save user address after he have bought product
[33m67f27b1[m invoice send with email feature
[33mfb49303[m admin can accept/cancel/shipp/pending order
[33m45b8025[m env variable for reset-pass
[33md5df04f[m feature of order in admin dashboard , small improvment and accept order in admin dashboard
[33m28ade2b[m reset password
[33mc1f05da[m bug fixes and improvments in Cart/Checkout/ProductPage
[33mae15a96[m implementing delete item from cart
[33mb26b00b[m sync state of cart component and category/id
[33m4e72bbd[m cart is updated when user press add to cart button
[33m2a01901[m changes
[33m10c8fd4[m feature for add to cart is implemented,fixes in cart page
[33ma400f2b[m bug fix for cart icon in navigation,and others same like this bug
[33mce0e6bf[m bug fix whne user add/remove quantity in category-product page
[33mad2d237[m contact/forgot-pass page are done,by default product quantity is not displayed when user click add it is incremented
[33m3aa663b[m fixes on UI and some bugs,add cart amount in menu,forgot/reset password backend is done
[33mfba43ba[m feature for all images and colors added
[33m8e04933[m main image feature for front
[33m658ba12[m add feature for color,when admin choose specifi color it is displayed with specific image
[33m8634e2a[m changes for test
[33mec60371[m UI changed for admin panel, add colors and images for products
[33mfc3928e[m add/remove quantity with new style and functionality for single product when we arrive from category page
[33m1b0e84c[m bug fix for product create, when user did not select the category its field value was 0
[33m8ce180e[m add phone number field in register,bug fix for category_id in product creation,is-available feature implemented
[33m44d32d4[m changed alt
[33ma671d1c[m changed url of image for category in page admin
[33me2c77e3[m homepage is changed is base of category, category,product changes in backend controller-services
[33m208c4d3[m fix corst key in backend
[33m5d9db57[m fix structure of category controller and service also the image is deleted when the category is deleted
[33mea1d194[m add image field for category
[33m807a26a[m add image field for category
[33m128a2f4[m add image field for category
[33m1a8a8e2[m bug fix for category name product page for the Admin
[33mb8250af[m remove console logs from category controllers and restore the state in CartContext
[33mc483c04[m bug fix in Cart page(public page)
[33m121c466[m switch back to user role
[33ma6454de[m fix for first time registered
[33mcdd4d90[m add .env in front,add new env-variable for CORS
[33m55b83d5[m added nginx config for paths other than root
[33m071f52b[m updated url for cors
[33m182b70a[m updated url for cors
[33mabbb916[m changed url name
[33ma02a225[m changed path for build
[33m50e3cae[m updated url as env for backend
[33mf3730d1[m env for db host
[33mc708c30[m added dockerfiles for backend frontend
[33m9f277b3[m each order now has even all products from the gell method
[33mef34c22[m fix bug for register insert token in cookies
[33mfd33897[m faq,about-us page are done. register feature is in progress
[33m646c392[m bug fix for Frontend when token has expired and user send new request, checkout page can gather user data
[33m025fda5[m bug fix for Frontend when token has expired and user send new request, checkout page can gather user data
[33mb29cedf[m bug fix for user in case token has expired
[33m3ae4dbf[m main changes for CRUD product/category showing messages
[33m6247190[m fix in throw erros message and Product/Category messages for Alert Component
[33mc01a6ef[m fix in checkout page when add and remove product is updated
[33m4c66bf4[m fix privileges in base of routes for admin and simple user
[33m556f7bb[m fix for image upload and  product when it is created create/update
[33m09551fd[m one state for create and update
[33m11cacc9[m decorators Roles and isPubic that check for privileges and grant access
[33mb076d63[m add a public role decorator for making some api public like : product,category
[33mfbf1736[m create Roles decorator and permission decorators that check for the right permissions
[33m1f64273[m login feature is implemented frontend/backend
[33mffeb52d[m checkout page is finished,add-remove quantity feature in cart page is done too
[33m9b9ca87[m ui changes in Cart page
[33m358f849[m Merge pull request #1 from andi-hbtn/glass_shop
[33me2d9dab[m[33m ([m[1;31morigin/glass_shop[m[33m, [m[1;32mglass_shop[m[33m)[m bug fix for adding same product x times ,same product added can be stored in the array of object in localstorage
[33m073a4bc[m updates on cart logic
[33mb438f55[m ui changes in cart page
[33m7e7fe8b[m small ui changes in Cart component
[33mf4fc19d[m cart page and products are displayed
[33mc304c8f[m cart page in progress
[33m3ec0560[m cart context and cart services are ready
[33m4ab2e28[m cart page is ready and add or remove quantity and price are done
[33mfaa45c8[m cart
[33mb1eab4c[m cart ui is done
[33m5220245[m home page and product page + context is ready
[33m918abc8[m create product with category fix
[33m3b8733b[m new login,register form,order fix in case user dont have account
[33ma159efd[m user can order productds, order order-item table are ready
[33mbada1e5[m api for crud operation category,product,user and db order ready
[33m8b1c782[m image update feature
[33me2023ca[m bug fix for multipart/form-data convert data in dto using Transform
[33m7ed25e1[m add upload image forntend/backend
[33m4fff3f4[m fix in auth guard
[33mcfef2e8[m on login admin data are shown
[33m7da66f3[m logout ,login finished frontend/backend part
[33m2f16c0e[m finished admin page with all crud opertations of category author book and finished backend api
[33m2175dcb[m fix check box
[33m94ea9f1[m modal manager fix for update and create
[33m32124e8[m add relations in backend and add functionalities for author and books modal
[33m77f6136[m add modal mangager
[33m58022d3[m add fixes and out of stock feature
[33mb2c4a56[m bug fix in delete author
[33m57e7c5b[m add author context and admin panel
[33m06b04d2[m add edit functionality and api
[33m5095864[m add category context in frontend
[33m3795b5d[m bug fix and
[33mbb5c698[m added author module and relationship with book table
[33mce4d79b[m add join table for posts and category
[33m014d8c1[m backend api for category and book
[33ma7b519d[m Initial commit
