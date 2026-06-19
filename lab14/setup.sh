#!/bin/bash
set -e

echo "Installing Astra theme..."
wp theme install astra --activate

echo "Installing plugins..."
wp plugin install smart-slider-3 contact-form-7 --activate

echo "Creating 'Головна' page..."
HOME_ID=$(wp post create --post_type=page --post_title='Головна' --post_status=publish --post_content='<h1>AeroTech Hub</h1><p>Ласкаво просимо до нашого інтернет-магазину гаджетів!</p>' --porcelain)

echo "Creating 'Каталог товарів' page..."
wp post create --post_type=page --post_title='Каталог товарів' --post_status=publish --post_content='<p>Тут буде каталог товарів.</p>'

echo "Creating 'Про нас' page..."
wp post create --post_type=page --post_title='Про нас' --post_status=publish --post_content='<p>Історія компанії AeroTech Hub.</p>'

echo "Creating 'Контакти' page..."
wp post create --post_type=page --post_title='Контакти' --post_status=publish --post_content='<p>Адреса: м. Київ</p>[contact-form-7 id="1" title="Контактна форма"]<iframe src="https://www.google.com/maps/embed?pb=..." width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy"></iframe>'

echo "Setting 'Головна' as front page..."
wp option update show_on_front page
wp option update page_on_front $HOME_ID

echo "Setup completed successfully!"
