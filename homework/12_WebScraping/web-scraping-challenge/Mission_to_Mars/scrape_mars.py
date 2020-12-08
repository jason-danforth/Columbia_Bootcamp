#!/usr/bin/env python
# coding: utf-8

import requests
import pymongo
import pandas as pd
import time
from splinter import Browser
from bs4 import BeautifulSoup as bs

def browser_init():
        # Initiate
        executable_path = {'executable_path': 'C:\\localref\\chromedriver.exe'}
        browser = Browser('chrome', **executable_path, headless=False)
        return browser

def scrape():

        data_dict = dict()

        # Scrape
        url = 'https://mars.nasa.gov/news/?page=0&per_page=40&order=publish_date+desc%2Ccreated_at+desc&search=&category=19%2C165%2C184%2C204&blank_scope=Latest'
        browser = browser_init()
        browser.visit(url)
        # Pause for browser to run
        time.sleep(2)
        html = browser.html
        soup = bs(html, 'html.parser')

        # Pull all articles
        results = soup.find_all('li', class_='slide')

        # Get title of first article and teaser paragraph
        title = results[0].find('h3').text
        teaser = results[0].find('div', class_='article_teaser_body').text

        # Consider Try Except
        data_dict['title'] = title 
        data_dict['teaser'] = teaser
        
        
        #JPL Image
        url = 'https://www.jpl.nasa.gov/spaceimages/?search=&category=Mars'
        browser.visit(url)
        html = browser.html
        soup = bs(html, 'html.parser')
        results = soup.find('div', class_='carousel_items')

        # Super ugly method for getting url that's buried in the tag...
        image_1 = 'https:/www.jpl.nasa.gov'
        image_2 = results.article["style"].split(" ")[1].replace('(', ',').replace(')', ',').replace("'", ",").split(',')[2]
        featured_image_url = image_1 + image_2
        featured_image_url

        data_dict['JPL'] = featured_image_url
        

        #Mars Weather
        url = 'https://twitter.com/marswxreport?lang=en'
        browser.visit(url)
        html = browser.html
        soup = bs(html, 'html.parser')
        results = soup.find_all('p', class_='TweetTextSize TweetTextSize--normal js-tweet-text tweet-text')
        mars_weather = results[0].text.rsplit(' ', 1)[0]+" hpa"

        data_dict['weather'] = mars_weather

        
        #Mars Facts
        url = 'https://space-facts.com/mars/'
        mars_facts_df = pd.read_html(url)[1]
        html_table = mars_facts_df.to_html(classes="table table-striped")

        data_dict['table'] = html_table        

        
        #Mars Hemispheres
        hemispheres = []
        urls = ['https://astrogeology.usgs.gov/search/map/Mars/Viking/cerberus_enhanced',
                'https://astrogeology.usgs.gov/search/map/Mars/Viking/schiaparelli_enhanced',
                'https://astrogeology.usgs.gov/search/map/Mars/Viking/syrtis_major_enhanced',
                'https://astrogeology.usgs.gov/search/map/Mars/Viking/valles_marineris_enhanced']

        for url in urls:
                hemi_dict = {}
                
                browser.visit(url)
                html = browser.html
                soup = bs(html, 'html.parser')
                
                # Find image title
                title_results = soup.find('h2', class_='title')
                title = title_results.text
                
                # Find image link
                for url in soup.find_all('img'):
                        if 'wide-image' in str(url):
                                img_url = 'https://astrogeology.usgs.gov' + url['src']
                
                hemi_dict['title'] = title
                hemi_dict['img_url'] = img_url
                hemispheres.append(hemi_dict)
                
        data_dict['hemispheres'] = hemispheres
 
        # Return everything
        return data_dict



